import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import WalletIcon from '@mui/icons-material/Wallet';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useConnect } from '../connect/use-connect';
import { useSelector } from 'react-redux';
import { selectCurrentNetwork } from '../../store/network/network.selector';

export const NavBar = () => {
  const { authenticate, signOut } = useConnect();
  const network = useSelector(selectCurrentNetwork);
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <CurrencyBitcoinIcon />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography variant='h6'>PSBT</Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Chip
              label={network.name}
              variant='outlined'
              sx={{ color: 'white' }}
              size='small'
            />
            <Button
              startIcon={<WalletIcon />}
              sx={{ color: 'white' }}
              onClick={authenticate}
            >
              Connect
            </Button>

            <Button
              startIcon={<LogoutIcon />}
              sx={{ color: 'white' }}
              onClick={signOut}
            >
              Sign out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
