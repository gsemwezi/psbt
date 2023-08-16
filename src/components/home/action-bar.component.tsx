import { Box, Button, Chip, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ActionLink } from './action-link.component';

export const ActionBar = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Stack direction={'row'} spacing={1}>
        <Chip
          label='Home'
          component={NavLink}
          to={'/'}
          variant='outlined'
          clickable
          sx={{ fontWeight: 'bold', borderColor: '' }}
        />
        <Chip
          label='Send PSBT'
          component={NavLink}
          to={'/psbt'}
          variant='outlined'
          clickable
          sx={{ fontWeight: 'bold', borderColor: '' }}
        />
      </Stack>
    </Box>
  );
};
