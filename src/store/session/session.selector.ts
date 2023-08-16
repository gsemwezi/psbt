import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CurrentAddresses, SessionState } from './session.reducer';

export type CurrentAddressMapType = Omit<CurrentAddresses, 'type'>;

type CurrentAddressMap = {
  p2wpkh: CurrentAddressMapType;
  p2tr: CurrentAddressMapType;
};

export const selectSessionReducer = (state: RootState): SessionState =>
  state.session;

export const selectSessionCurrentAddresses = createSelector(
  selectSessionReducer,
  (session) => session.addresses
);

const selectCurrentAddressesMap = createSelector(
  selectSessionCurrentAddresses,
  (addresses) => {
    let map: any = {};
    for (const {
      address,
      publicKey,
      symbol,
      derivationPath,
      type,
    } of addresses) {
      map[type] = {
        address,
        publicKey,
        derivationPath,
        symbol,
      } as CurrentAddressMapType;
    }
    return map as CurrentAddressMap;
  }
);

export const selectUserDataProfile = createSelector(
  selectSessionReducer,
  (session) => session.userData.profile
);

export const selectCurrentSegwitData = createSelector(
  selectCurrentAddressesMap,
  (addresses) => addresses.p2wpkh
);

export const selectCurrentSegwitAccount = createSelector(
  selectCurrentSegwitData,
  (data) => (data ? extractAccountNumber(data?.derivationPath) + 1 : 1)
);

function extractAccountNumber(path: string) {
  const segments = path.split('/');
  const accountNum = parseInt(segments[3].replaceAll("'", ''), 10);
  if (isNaN(accountNum))
    throw new Error('Cannot parse account number from path');
  return accountNum;
}
