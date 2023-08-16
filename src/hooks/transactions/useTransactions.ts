import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTransactionsQuery } from '../../store/api/apiSlice';
import { selectCurrentSegwitData } from '../../store/session/session.selector';
export const useTransactions = () => {
  const segwitData = useSelector(selectCurrentSegwitData);
  const { data, isLoading: isTransactionLoading } = useGetTransactionsQuery(
    segwitData.address,
    {
      pollingInterval: 30000,
    }
  );

  return { data, isTransactionLoading };
};
