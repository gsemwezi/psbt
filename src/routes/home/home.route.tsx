import { Home as HomeComponent } from '../../components/home/home.component';
import { ConnectGate } from '../../components/connect/connect-gate.component';

export const Home = () => {
  return (
    <>
      <ConnectGate>
        <HomeComponent />
      </ConnectGate>
    </>
  );
};
