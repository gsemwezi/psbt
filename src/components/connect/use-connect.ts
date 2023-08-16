import {
  AppConfig,
  FinishedAuthData,
  UserSession,
  showConnect,
} from '@stacks/connect';
import { useDispatch } from 'react-redux';
import {
  CurrentAddresses,
  setSession,
} from '../../store/session/session.reducer';
import { useNavigate } from 'react-router-dom';

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

export const useConnect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    userSession.signUserOut();
    navigate('/connect');
  };
  const authenticate = async () => {
    if (!userSession.isUserSignedIn()) {
      showConnect({
        appDetails: {
          name: 'Sign Psbt',
          icon: 'url',
        },
        userSession,
        sendToSignIn: true,
        async onFinish(payload: FinishedAuthData) {
          const userData = payload.userSession.loadUserData();
          const response = await window.btc?.request('getAddresses');
          dispatch(
            setSession({
              userData,
              addresses:
                (response.result.addresses as CurrentAddresses[]) ?? [],
            })
          );
        },
        onCancel() {},
      });
    } else {
      const userData = userSession.loadUserData();
      const response = await window.btc.request('getAddresses');
      dispatch(
        setSession({
          userData,
          addresses: (response.result.addresses as CurrentAddresses[]) ?? [],
        })
      );
    }
    navigate('/');
  };

  return {
    authenticate,
    signOut,
  };
};
