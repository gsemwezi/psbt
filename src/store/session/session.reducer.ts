import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '@stacks/connect';

export type CurrentAddresses = {
  symbol: string;
  type: string;
  address: string;
  publicKey: string;
  derivationPath: string;
};

export type SessionState = {
  userData: UserData;
  addresses: CurrentAddresses[];
};

const INITIAL_STATE: SessionState = {
  addresses: [],
  userData: {
    appPrivateKey: '',
    hubUrl: '',
    coreNode: '',
    authResponseToken: '',
    profile: {},
  },
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: INITIAL_STATE,
  reducers: {
    setSession: (state: SessionState, action) => {
      state.addresses = action.payload.addresses;
      state.userData = action.payload.userData;
    },
  },
});

export const { setSession } = sessionSlice.actions;

export default sessionSlice.reducer;
