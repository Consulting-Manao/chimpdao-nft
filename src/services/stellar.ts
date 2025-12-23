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
    .addOperation(contract.call('token_uri', nativeToScVal(tokenId, { type: 'u64' })))
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
    .addOperation(contract.call('owner_of', nativeToScVal(tokenId, { type: 'u64' })))
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
