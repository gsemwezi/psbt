import { styled } from '@mui/material/styles';
import { NavLink, NavLinkProps } from 'react-router-dom';

const StyledNavLink = styled(NavLink)({
  boxShadow: 'none',
  color: 'black',
  textDecoration: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#0063cc',
  borderRadius: 50,
  fontFamily: 'Roboto',
  //   '&:active': {
  //     backgroundColor: 'rgb(142 200 247)',
  //     borderColor: '#0062cc',
  //     boxShadow: 'none',
  //   },
  '&:hover, &:active': {
    backgroundColor: 'rgb(142 200 247)',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
});

export const ActionLink = (
  props: NavLinkProps & React.RefAttributes<HTMLAnchorElement>
) => {
  return <StyledNavLink {...props} />;
};
