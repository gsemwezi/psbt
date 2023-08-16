import React from 'react';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTransactions } from '../../hooks/transactions/useTransactions';
import { useSelector } from 'react-redux';
import { selectCurrentSegwitData } from '../../store/session/session.selector';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { selectCurrentNetwork } from '../../store/network/network.selector';

export const Transactions = () => {
  const segwitData = useSelector(selectCurrentSegwitData);
  const network = useSelector(selectCurrentNetwork);

  const { data, isTransactionLoading } = useTransactions();

  if (isTransactionLoading) {
    return (
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <List sx={{ overflow: 'auto', maxHeight: 500 }}>
      {data &&
        data.map((transaction: any) => {
          const vin = transaction.vin.reduce(
            (accumulator: bigint, currentValue: any) => {
              if (
                currentValue.prevout.scriptpubkey_address === segwitData.address
              )
                return accumulator + BigInt(currentValue.prevout.value);
              else return accumulator + BigInt(0);
            },
            BigInt(0)
          );

          const vout = transaction.vout.reduce(
            (accumulator: bigint, currentValue: any) => {
              if (currentValue.scriptpubkey_address === segwitData.address)
                return accumulator + BigInt(currentValue.value);
              else return accumulator + BigInt(0);
            },
            BigInt(0)
          );

          if (vin > 0) {
            const confirmed = transaction.status.confirmed ? '' : 'Pending';
            return (
              <ListItem disableGutters key={transaction.txid}>
                <ListItemButton
                  component='a'
                  target='_blank'
                  href={`${network.basePath}/tx/${transaction.txid}`}
                >
                  <ListItemIcon>
                    <RemoveCircleOutlineRoundedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>{transaction.txid}</Typography>
                    <Typography aria-label='comment'>
                      {` - ${
                        Number(BigInt(vin - vout)) / 100000000
                      } BTC ${confirmed}`}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          } else {
            const confirmed = transaction.status.confirmed ? '' : 'Pending';
            return (
              <ListItem disableGutters disablePadding key={transaction.txid}>
                <ListItemButton
                  component='a'
                  target='_blank'
                  href={`${network.basePath}/tx/${transaction.txid}`}
                >
                  <ListItemIcon>
                    <AddCircleOutlineRoundedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>{transaction.txid}</Typography>
                    <Typography>{`${
                      Number(BigInt(vout)) / 100000000
                    } BTC ${confirmed}`}</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          }
        })}
    </List>
  );
};
