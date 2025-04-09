import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { setCookie } from '../common/util';
import ViewTokenData from '../components/viewToken';
import { TokenData } from '../common/type';
import { sampleApi } from '../common/axios';

const TmpPage = () => {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const [tokenData, setTokenData] = useState({
    accessToken: '',
    refreshToken: '',
  });

  useEffect(() => {
    const at = query.get('at');
    const rt = query.get('rt');

    if (at && rt) {
      setCookie(
        'token',
        JSON.stringify({
          accessToken: at,
          refreshToken: rt,
        }),
      );

      setTokenData({
        accessToken: at,
        refreshToken: rt,
      });

      const sid = (jwtDecode(at) as TokenData).uuid;

      if (sid) {
        setCookie('SSO_PROJECT.sid', sid);
      }

      saveSignInData(at, rt);
    }
  }, []);

  const goHome = () => {
    navigate('/');
  };

  const saveSignInData = async (at: string, rt: string) => {
    try {
      const res = await sampleApi.post('/api/v2/user/sign-in', {
        accessToken: at,
        refreshToken: rt,
        sessionId: (jwtDecode(at) as TokenData).uuid,
      });

      console.log('Save Sign-in data in server result:: ', res.data);
    } catch (err) {
      console.error('Save Sign-in data get error.', err);
    }
  };

  return (
    <>
      <h1>Temporary Page</h1>
      {!!tokenData.accessToken && (
        <>
          <ViewTokenData tokenData={tokenData} setTokenData={setTokenData}>
            <button
              style={{
                width: '100%',
                height: '50px',
                backgroundColor: '#005fff',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '7px',
                borderColor: 'white',
              }}
              onClick={(e) => {
                e.preventDefault();
                goHome();
              }}
            >
              go home
            </button>
          </ViewTokenData>
        </>
      )}
    </>
  );
};

export default TmpPage;
