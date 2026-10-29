import { rpc, xdr, Address, Contract, Keypair, Account, TransactionBuilder, nativeToScVal, scValToNative } from '@stellar/stellar-sdk';
import { rpcUrl, networkPassphrase } from '@/config/networks';

export async function getTokenUri(
  contractId: string,
  tokenId: number
): Promise<string> {
  const server = new rpc.Server(rpcUrl);
  
  // Create a dummy source account for simulation
  const sourceKeypair = Keypair.random();
  const sourceAccount = new Account(sourceKeypair.publicKey(), '0');
  
  const contract = new Contract(contractId);
  
  const tx = new TransactionBuilder(sourceAccount, {
    fee: '100',
    networkPassphrase,
  })
    .addOperation(contract.call('token_uri', nativeToScVal(tokenId, { type: 'u32' })))
    .setTimeout(30)
    .build();
  
  const response = await server.simulateTransaction(tx);
  
  if (rpc.Api.isSimulationError(response)) {
    throw new Error(`Simulation error: ${response.error}`);
  }
  
  if (!('result' in response) || !response.result) {
    throw new Error('No result from simulation');
  }
  
  const resultValue = response.result.retval;
  return scValToNative(resultValue) as string;
}

export async function getTokenOwner(
  contractId: string,
  tokenId: number
): Promise<string | null> {
  const server = new rpc.Server(rpcUrl);
  
  const sourceKeypair = Keypair.random();
  const sourceAccount = new Account(sourceKeypair.publicKey(), '0');
  
  const contract = new Contract(contractId);
  
  const tx = new TransactionBuilder(sourceAccount, {
    fee: '100',
    networkPassphrase,
  })
    .addOperation(contract.call('owner_of', nativeToScVal(tokenId, { type: 'u32' })))
    .setTimeout(30)
    .build();
  
  try {
    const response = await server.simulateTransaction(tx);
    
    if (rpc.Api.isSimulationError(response)) {
      return null;
    }
    
    if (!('result' in response) || !response.result) {
      return null;
    }
    
    const resultValue = response.result.retval;
    return scValToNative(resultValue) as string;
  } catch {
    return null;
  }
}

/**
 * Owner of a card token: the card's purse. Unlike `getTokenOwner`, a failure to ask is not
 * an answer. `null` means the contract said the token does not exist (NonExistentToken, 201):
 * `mint` writes the owner, so an existing token always has one. Anything else throws.
 */
export async function getCardOwner(
  contractId: string,
  tokenId: number
): Promise<string | null> {
  const server = new rpc.Server(rpcUrl);
  const source = new Account(Keypair.random().publicKey(), '0');
  const tx = new TransactionBuilder(source, {
    fee: '100',
    networkPassphrase,
  })
    .addOperation(new Contract(contractId).call('owner_of', nativeToScVal(tokenId, { type: 'u32' })))
    .setTimeout(30)
    .build();

  const response = await server.simulateTransaction(tx);
  if (rpc.Api.isSimulationError(response)) {
    if (/Error\(Contract, #201\)/.test(response.error)) return null;
    throw new Error(`Simulation error: ${response.error}`);
  }
  if (!('result' in response) || !response.result) {
    throw new Error('No result from simulation');
  }
  return scValToNative(response.result.retval) as string;
}

/** The next token id to be minted, which is also how many tokens exist (ids start at 0). */
export async function getNextTokenId(contractId: string): Promise<number> {
  const server = new rpc.Server(rpcUrl);
  const source = new Account(Keypair.random().publicKey(), '0');
  const tx = new TransactionBuilder(source, {
    fee: '100',
    networkPassphrase,
  })
    .addOperation(new Contract(contractId).call('next_token_id'))
    .setTimeout(30)
    .build();

  const response = await server.simulateTransaction(tx);
  if (rpc.Api.isSimulationError(response)) {
    throw new Error(`Simulation error: ${response.error}`);
  }
  if (!('result' in response) || !response.result) {
    throw new Error('No result from simulation');
  }
  return Number(scValToNative(response.result.retval));
}

/** Ledger keys per `getLedgerEntries` call; the RPC accepts up to 200. */
const LEDGER_KEYS_PER_CALL = 100;

function contractDataKey(contractId: string, key: xdr.ScVal): xdr.LedgerKey {
  return xdr.LedgerKey.contractData(
    new xdr.LedgerKeyContractData({
      contract: new Address(contractId).toScAddress(),
      key,
      durability: xdr.ContractDataDurability.persistent,
    })
  );
}

/**
 * Every minted token's metadata URI, read straight from the contract's storage.
 *
 * Asking `token_uri` per token costs one simulation each; the ledger holds the same answer
 * and `getLedgerEntries` returns a hundred of them per call, so a 195-card campaign takes
 * three requests instead of 195. `mint` writes the `TokenUri` entry when it is given a URI;
 * a token without one is served as `{base_uri}/{token_id}`, which is rebuilt here from the
 * instance's `Uri` exactly as the contract does. Token ids are dense (`0..NextTokenId`), so
 * the count is the number minted, capped at `limit`.
 */
export async function getTokenUris(contractId: string, limit: number): Promise<string[]> {
  const server = new rpc.Server(rpcUrl);

  const instance = (
    await server.getLedgerEntries(contractDataKey(contractId, xdr.ScVal.scvLedgerKeyContractInstance()))
  ).entries[0]?.val;
  if (instance?.type !== 'contractData') throw new Error('Contract not found');
  const instanceVal = instance.contractData.val;
  if (instanceVal.type !== 'scvContractInstance') throw new Error('Contract not found');

  let next = 0;
  let base = '';
  for (const entry of instanceVal.instance.storage ?? []) {
    const [name] = scValToNative(entry.key) as [string];
    if (name === 'NextTokenId') next = Number(scValToNative(entry.val));
    if (name === 'Uri') base = scValToNative(entry.val) as string;
  }
  const count = Math.min(next, limit);

  const stored = new Map<number, string>();
  for (let from = 0; from < count; from += LEDGER_KEYS_PER_CALL) {
    const ids = Array.from({ length: Math.min(LEDGER_KEYS_PER_CALL, count - from) }, (_, i) => from + i);
    const { entries } = await server.getLedgerEntries(
      ...ids.map((id) =>
        contractDataKey(
          contractId,
          xdr.ScVal.scvVec([xdr.ScVal.scvSymbol('TokenUri'), nativeToScVal(id, { type: 'u32' })])
        )
      )
    );
    for (const { key, val } of entries) {
      if (key.type !== 'contractData' || val.type !== 'contractData') continue;
      const [, id] = scValToNative(key.contractData.key) as [string, number];
      stored.set(Number(id), scValToNative(val.contractData.val) as string);
    }
  }

  return Array.from({ length: count }, (_, id) => stored.get(id) ?? `${base}/${id}`);
}
