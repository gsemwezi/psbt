type UnSpentUtxoStatus = {
  confirmed: boolean;
};

export type UnSpentUtxo = {
  status: UnSpentUtxoStatus;
  txid: string;
  value: bigint;
  vout: number;
};
