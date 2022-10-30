import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FC } from 'react';
import { Loading } from '../components/Elements/Loading/Loading';

type Props = {
  component: React.FC;
};

export const RouteGuard: FC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => {
      return <Loading />;
    },
  });
  return <Component />;
};
