import { useSelector } from 'react-redux';
import { selectSessionCurrentAddresses } from '../../store/session/session.selector';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ConnectGateProps {
  children?: ReactNode;
}

export const ConnectGate = ({ children }: ConnectGateProps) => {
  const addresses = useSelector(selectSessionCurrentAddresses);
  if (addresses.length === 0) return <Navigate to={'/connect'} />;

  return <>{children}</>;
};
