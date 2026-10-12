import { rpc, Contract, Keypair, Account, TransactionBuilder, nativeToScVal, scValToNative } from '@stellar/stellar-sdk';
import { getRpcUrl, getNetworkPassphrase, type Network, defaultNetwork } from '@/config/networks';

export async function getTokenUri(
  contractId: string,
  tokenId: number,
  network: Network = defaultNetwork
): Promise<string> {
  const rpcUrl = getRpcUrl(network);
  const server = new rpc.Server(rpcUrl);
  
  // Create a dummy source account for simulation
  const sourceKeypair = Keypair.random();
  const sourceAccount = new Account(sourceKeypair.publicKey(), '0');
  
  const contract = new Contract(contractId);
  
  const tx = new TransactionBuilder(sourceAccount, {
    fee: '100',
    networkPassphrase: getNetworkPassphrase(network),
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
  tokenId: number,
  network: Network = defaultNetwork
): Promise<string | null> {
  const rpcUrl = getRpcUrl(network);
  const server = new rpc.Server(rpcUrl);
  
  const sourceKeypair = Keypair.random();
  const sourceAccount = new Account(sourceKeypair.publicKey(), '0');
  
  const contract = new Contract(contractId);
  
  const tx = new TransactionBuilder(sourceAccount, {
    fee: '100',
    networkPassphrase: getNetworkPassphrase(network),
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
  tokenId: number,
  network: Network
): Promise<string | null> {
  const server = new rpc.Server(getRpcUrl(network));
  const source = new Account(Keypair.random().publicKey(), '0');
  const tx = new TransactionBuilder(source, {
    fee: '100',
    networkPassphrase: getNetworkPassphrase(network),
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
export async function getNextTokenId(contractId: string, network: Network): Promise<number> {
  const server = new rpc.Server(getRpcUrl(network));
  const source = new Account(Keypair.random().publicKey(), '0');
  const tx = new TransactionBuilder(source, {
    fee: '100',
    networkPassphrase: getNetworkPassphrase(network),
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
