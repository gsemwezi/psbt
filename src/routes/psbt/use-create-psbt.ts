import { useCallback, useMemo } from 'react';
import {
  useBroadCastTransactionMutation,
  useGetRecommendedFeesQuery,
  useGetUnspentUtxoQuery,
} from '../../store/api/apiSlice';
import { PsbtRequestOptions } from '@stacks/connect';
import * as btc from '@scure/btc-signer';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { useSelector } from 'react-redux';
import {
  CurrentAddressMapType,
  selectCurrentSegwitData,
} from '../../store/session/session.selector';
import {
  Network,
  selectCurrentNetwork,
} from '../../store/network/network.selector';
import { UnSpentUtxo } from '../../store/api/types';
import { useUnspentUtxo } from '../../hooks/utxo/useUnspentUtxo.hook';
export type FormData = {
  recipient: string;
  amount: number;
};

type UseCreatePsbtProps = {
  address: string;
};

type SignPsbtRequestParams = {
  hex: string;
  network?: string;
};

export const useCreatePsbt = ({ address }: UseCreatePsbtProps) => {
  //   const { data, refetch: refetchUtxo } = useGetUnspentUtxoQuery(address);
  const { confirmedBalance, utxos, refetchUtxo } = useUnspentUtxo();
  const { data: recommendedFees } = useGetRecommendedFeesQuery();
  const [
    broadCastTransaction,
    { data: broadCastResult, error: broadCastError, isLoading },
  ] = useBroadCastTransactionMutation();
  const segwitData = useSelector(selectCurrentSegwitData);
  const network = useSelector(selectCurrentNetwork);
  //   const balanceAmounts = useMemo(() => {
  //     let availableBalanceAmount: bigint = BigInt(0);
  //     let pendingBalanceAmount: bigint = BigInt(0);
  //     if (data) {
  //       availableBalanceAmount = data
  //         .filter((item: any) => item.status.confirmed)
  //         .reduce(
  //           (accumulator: bigint, currentValue: UnSpentUtxo) =>
  //             accumulator + BigInt(currentValue.value),
  //           BigInt(0)
  //         );

  //       pendingBalanceAmount = data
  //         .filter((item: UnSpentUtxo) => !item.status.confirmed)
  //         .reduce(
  //           (accumulator: bigint, currentValue: any) =>
  //             accumulator + currentValue.value,
  //           BigInt(0)
  //         );
  //     }

  //     return {
  //       availableBalanceAmount,
  //       pendingBalanceAmount,
  //     };
  //   }, [data]);

  const sendAmounts = useMemo(() => {
    let maxSendAmount = BigInt(0);
    let minSendAmount = BigInt(0);
    if (recommendedFees) {
      maxSendAmount =
        confirmedBalance.satoshi - BigInt(recommendedFees.minimumFee);
      minSendAmount =
        confirmedBalance.satoshi > BigInt(recommendedFees.fastestFee)
          ? recommendedFees.fastestFee + 1
          : 0;
    }

    return {
      maxSendAmount,
      minSendAmount,
    };
  }, [confirmedBalance, recommendedFees]);

  const onFormSubmit = useCallback(
    async (formData: FormData) => {
      const tx = buildNativeSegwitPsbtRequestOptions(
        segwitData,
        formData,
        utxos,
        network,
        recommendedFees
      );
      const requestParams: SignPsbtRequestParams = {
        hex: tx.hex,
        network: 'testnet',
      };

      const response = await window.btc.request('signPsbt', requestParams);
      const txHex = response.result.hex;
      const bytes = typeof txHex === 'string' ? hexToBytes(txHex) : txHex;
      const transactionToBroadCast = btc.Transaction.fromPSBT(bytes);
      transactionToBroadCast.finalize();
      broadCastTransaction(transactionToBroadCast.hex);
    },
    [network, segwitData, broadCastTransaction, recommendedFees, utxos]
  );

  return {
    confirmedBalance,
    recommendedFees,
    sendAmounts,
    onFormSubmit,
    broadCastResult,
    broadCastError,
    refetchUtxo,
  };
};

function buildNativeSegwitPsbtRequestOptions(
  segwitData: CurrentAddressMapType,
  formData: FormData,
  data: any,
  network: Network,
  recommendedFees: any
): PsbtRequestOptions {
  const p2wpkh = btc.p2wpkh(hexToBytes(segwitData.publicKey));
  const tx = new btc.Transaction();

  const amountPlusFees = BigInt(formData.amount) + BigInt(6000);
  let totalUtxos = BigInt(0);
  const unspentUtxos = data.filter((item: any) => item.status.confirmed);

  let index = 0;
  for (const utxo of unspentUtxos) {
    totalUtxos += BigInt(utxo.value);
    tx.addInput({
      index: utxo.vout,
      txid: utxo.txid,
      sequence: 0,
      witnessUtxo: {
        amount: BigInt(utxo.value),
        script: p2wpkh.script,
      },
    });
    if (totalUtxos >= amountPlusFees) break;
    index++;
  }

  // Add recipient output
  tx.addOutputAddress(
    formData.recipient,
    BigInt(formData.amount),
    network.definition
  );
  let numberOutputs = 1;

  if (totalUtxos - amountPlusFees > 0) numberOutputs++;

  //Calculate Fee
  const transactionSize = (index + 1) * 68.5 + numberOutputs * 31 + 10;
  const fee = BigInt(Math.ceil(transactionSize * recommendedFees.hourFee));

  // Add change psbt data
  const amountWithActualFees = BigInt(formData.amount) + fee;
  const outputAmount = totalUtxos - amountWithActualFees;

  if (outputAmount > 0) {
    tx.addOutputAddress(segwitData.address, outputAmount, network.definition);
  }
  const psbt = tx.toPSBT();

  return { hex: bytesToHex(psbt) };
}
