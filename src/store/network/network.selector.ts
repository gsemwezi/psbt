import { createSelector } from 'reselect';
import {
  selectUserDataProfile,
  selectCurrentSegwitData,
} from '../session/session.selector';
import * as btc from '@scure/btc-signer';

export type Network = {
  name: 'mainnet' | 'testnet';
  definition: typeof btc.NETWORK;
  basePath: string;
};

export const Mainnet: Network = {
  name: 'mainnet',
  definition: btc.NETWORK,
  basePath: 'https://mempool.space',
};

export const Testnet: Network = {
  name: 'testnet',
  definition: btc.TEST_NETWORK,
  basePath: 'https://mempool.space/testnet',
};

export const selectCurrentNetwork = createSelector(
  [selectUserDataProfile, selectCurrentSegwitData],
  (profile, segwitData) => {
    return profile.btcPublicKey.p2wpkh === segwitData?.publicKey
      ? Mainnet
      : Testnet;
  }
);
