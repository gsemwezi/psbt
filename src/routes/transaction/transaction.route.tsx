import { useSelector } from 'react-redux';
import { useGetTransactionsQuery } from '../../store/api/apiSlice';
import { selectCurrentSegwitData } from '../../store/session/session.selector';
import { Transactions } from '../../components/transactions/transactions.component';

export const Transaction = () => {
  return <Transactions />;
};
