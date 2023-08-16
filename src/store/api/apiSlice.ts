import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { selectCurrentNetwork } from '../network/network.selector';
import { RootState } from '../store';
import { UnSpentUtxo } from './types';

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const network = selectCurrentNetwork(api.getState() as RootState);
  const baseUrl =
    network.name === 'mainnet'
      ? 'https://mempool.space'
      : 'https://mempool.space/testnet';
  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getUnspentUtxo: builder.query<UnSpentUtxo[], string>({
      query: (address: string) => `/api/address/${address}/utxo`,
    }),
    getTransactions: builder.query({
      query: (address: string) => `/api/address/${address}/txs`,
    }),
    getRecommendedFees: builder.query<any, void>({
      query: () => '/api/v1/fees/recommended',
    }),
    broadCastTransaction: builder.mutation<string, string>({
      query: (tx: string) => ({
        url: `/api/tx`,
        method: 'POST',
        body: tx,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        responseHandler: 'text',
      }),
    }),
  }),
});

export const {
  useGetUnspentUtxoQuery,
  useGetRecommendedFeesQuery,
  useBroadCastTransactionMutation,
  useGetTransactionsQuery,
} = apiSlice;
