export type Network = 'testnet' | 'mainnet';

export const networkConfig = {
  testnet: {
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
  },
  mainnet: {
    rpcUrl: 'https://rpc.lightsail.network/',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
  },
} as const;

// Default network - change to 'mainnet' for production
export const defaultNetwork: Network = 'testnet';

export function getRpcUrl(network: Network = defaultNetwork): string {
  return networkConfig[network].rpcUrl;
}

export function getNetworkPassphrase(network: Network = defaultNetwork): string {
  return networkConfig[network].networkPassphrase;
}
