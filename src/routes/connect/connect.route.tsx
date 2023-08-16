import { Box, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Connect as ConnectionToWallet } from '../../components/connect/connect.component';

export const Connect = () => {
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      sx={{ width: 1, height: '100vh' }}
    >
      <Box m='auto'>
        <ConnectionToWallet text='Login' icon={<SendIcon />} />
      </Box>
    </Stack>
  );
};
