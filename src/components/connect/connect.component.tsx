import { useConnect } from './use-connect';
import { Button, Container } from '@mui/material';

type ConnectProps = {
  text: string;
  icon?: React.ReactNode;
};

export const Connect = ({ text, icon }: ConnectProps) => {
  const { authenticate } = useConnect();

  return (
    <Container>
      <Button variant='contained' endIcon={icon} onClick={authenticate}>
        {text}
      </Button>
    </Container>
  );
};
