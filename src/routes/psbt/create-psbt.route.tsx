import { SubmitHandler, useForm } from 'react-hook-form';
import { validate } from 'bitcoin-address-validation';
import { useCreatePsbt } from './use-create-psbt';
import { useSelector } from 'react-redux';
import { selectCurrentSegwitData } from '../../store/session/session.selector';
import { FormData } from './use-create-psbt';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';

export const CreatePsbt = () => {
  const { address } = useSelector(selectCurrentSegwitData);
  const navigate = useNavigate();
  const { confirmedBalance, onFormSubmit, broadCastResult, refetchUtxo } =
    useCreatePsbt({
      address,
    });

  useEffect(() => {
    if (broadCastResult) {
      refetchUtxo();
      navigate('/');
    }
  }, [broadCastResult, refetchUtxo, navigate]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await onFormSubmit(data);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} spacing={4}>
          <Typography variant='h4'>Create PSBT Transaction</Typography>
          <TextField
            variant='outlined'
            label={'Recipient address'}
            {...register('recipient', {
              required: {
                value: true,
                message: 'Please enter a valid recipient address',
              },
              validate: {
                validSegwitAddress: (value) =>
                  validate(value) || 'Please enter a valid recipient address ',
              },
            })}
            placeholder='Enter recipient address'
          />
          <Typography variant='subtitle2' color={'error'}>
            {errors.recipient?.message}
          </Typography>
          <TextField
            variant='outlined'
            label={'Amount to send'}
            {...register('amount', {
              required: {
                value: true,
                message: 'Enter the amount to send in satoshi',
              },
              valueAsNumber: true,
              validate: {
                lessThanOrEqualMaxAmount: (value) =>
                  BigInt(value) <= confirmedBalance.satoshi ||
                  'Insufficient funds',
                GreaterThanOrEqualMinAmount: (value) =>
                  value >= 6000 || `Minimum amount should be 6000`,
              },
            })}
          />
          <Typography variant='subtitle2' color={'error'}>
            {errors.amount?.message}
          </Typography>
          <br />
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
