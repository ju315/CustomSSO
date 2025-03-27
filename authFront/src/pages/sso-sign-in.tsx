import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCookie } from '../common/util';

const SSOSignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.opener) {
      const cookie = getCookie('token');

      if (!cookie) {
        navigate('/');
        return;
      }

      window.opener.postMessage({ cookie }, '*');

      window.close();
    }
  }, []);

  return (
    <>
      <div>
        <h1>SSO Sign-in</h1>
      </div>
    </>
  );
};

export default SSOSignIn;
