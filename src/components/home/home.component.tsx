import { Link, Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import { NavBar } from '../navigation-bar/navigation-bar.component';
import { AccountInfo } from '../account-info/account-info.component';
import { ActionBar } from './action-bar.component';

export const Home = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Stack spacing={5} direction={'column'}>
          <AccountInfo />
          <ActionBar />
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};
