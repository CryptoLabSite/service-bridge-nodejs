
// const DEFAULT_TEST_PROVIDER_RPC_URL = 'http://127.0.0.1:5050/rpc';
import { ProviderInterface, RpcProvider } from 'starknet';
import * as process from "process";

const DEFAULT_TEST_PROVIDER_RPC_URL = 'https://starknet-goerli.infura.io/v3/8879adc5ace644639944a6b9505248c8';
const RPC_URL = process.env.RPC_URL || DEFAULT_TEST_PROVIDER_RPC_URL;
export const IS_LOCALHOST_DEVNET =
  RPC_URL.includes('localhost') || RPC_URL.includes('127.0.0.1');

export const getProvider = (): ProviderInterface => {
  const provider = new RpcProvider({ nodeUrl: RPC_URL });

  if (IS_LOCALHOST_DEVNET) {
    // accelerate the tests when running locally
    const originalWaitForTransaction =
      provider.waitForTransaction.bind(provider);
    provider.waitForTransaction = (txHash, retryInterval) => {
      return originalWaitForTransaction(txHash, retryInterval || 1000);
    };
  }

  return provider;
};

type Env = {
  nodeUrl: string;
};

const devEnv: Env = {
  nodeUrl: 'http://127.0.0.1:5050/rpc',
};

const testEnv: Env = {
  nodeUrl:
    'https://starknet-goerli.infura.io/v3/8879adc5ace644639944a6b9505248c8',
};

const prodEnv = {
  nodeUrl: '',
};

export const ENV: Env = (process.env.ENV === 'PROD' && prodEnv) || testEnv;
