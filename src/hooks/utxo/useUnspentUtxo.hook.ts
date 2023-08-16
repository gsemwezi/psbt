import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetUnspentUtxoQuery } from '../../store/api/apiSlice';
import { selectCurrentSegwitData } from '../../store/session/session.selector';
import { UnSpentUtxo } from '../../store/api/types';
import { SubscriptionOptions } from '@reduxjs/toolkit/dist/query/core/apiState';

type UnSpentUtxoResult = {
  confirmedUtxo: UnSpentUtxo[];
  pendingUtxo: UnSpentUtxo[];
  confirmedBalance: Balance;
  pendingBalance: Balance;
  refetchUtxo(): any;
  isLoadingUtxo: boolean;
  utxos: UnSpentUtxo[] | undefined;
};

type Balance = {
  bitcoin: number;
  satoshi: bigint;
};

type UseUnspentUtxoProps = {
  options?: SubscriptionOptions;
};

export const useUnspentUtxo = (
  props?: UseUnspentUtxoProps
): UnSpentUtxoResult => {
  const segwitData = useSelector(selectCurrentSegwitData);
  const {
    data,
    isLoading: isLoadingUtxo,
    refetch: refetchUtxo,
  } = useGetUnspentUtxoQuery(segwitData.address, { ...props?.options });

  const confirmedUtxo = useMemo(() => {
    return data ? data.filter((utxo) => utxo.status.confirmed) : [];
  }, [data]);

  const pendingUtxo = useMemo(() => {
    return data ? data.filter((utxo) => !utxo.status.confirmed) : [];
  }, [data]);

  const confirmedBalance = useMemo(() => {
    const balance = confirmedUtxo.reduce(
      (accumulator: bigint, currentValue: UnSpentUtxo) =>
        accumulator + BigInt(currentValue.value),
      BigInt(0)
    );

    return {
      satoshi: balance,
      bitcoin: Number(balance) / 100000000,
    } as Balance;
  }, [confirmedUtxo]);

  const pendingBalance = useMemo(() => {
    const balance = pendingUtxo.reduce(
      (accumulator: bigint, currentValue: UnSpentUtxo) =>
        accumulator + BigInt(currentValue.value),
      BigInt(0)
    );

    return {
      satoshi: balance,
      bitcoin: Number(balance) / 100000000,
    } as Balance;
  }, [pendingUtxo]);

  return {
    confirmedUtxo,
    pendingUtxo,
    confirmedBalance,
    pendingBalance,
    refetchUtxo,
    isLoadingUtxo,
    utxos: data,
  };
};
