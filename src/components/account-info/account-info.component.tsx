import React from 'react';
import { useUnspentUtxo } from '../../hooks/utxo/useUnspentUtxo.hook';
import { useSelector } from 'react-redux';
import { selectCurrentSegwitAccount } from '../../store/session/session.selector';
import { Box, Stack, Typography } from '@mui/material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export const AccountInfo = () => {
  const account = useSelector(selectCurrentSegwitAccount);
  const { confirmedBalance } = useUnspentUtxo({
    options: { pollingInterval: 15000 },
  });
  return (
    <>
      <Stack direction={'column'}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant='h2'
        >{`Account ${account}`}</Typography>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <CurrencyBitcoinIcon />
          <Typography variant='h5'>
            {confirmedBalance.bitcoin.toString()}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};
