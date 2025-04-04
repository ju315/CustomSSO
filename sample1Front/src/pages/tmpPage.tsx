import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { setCookie } from '../common/util';
import ViewTokenData from '../components/viewToken';
import { TokenData } from '../common/type';

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
    }
  }, []);

  const goHome = () => {
    navigate('/');
  };

  const saveSignInData = () => {
    fetch('http://192.168.62.13:8001/api/v2/user/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...tokenData,
        sessionId: (jwtDecode(tokenData.accessToken) as TokenData).uuid,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
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
            <button
              style={{
                width: '100%',
                height: '50px',
                backgroundColor: '#afd700',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '7px',
                borderColor: 'white',
              }}
              onClick={(e) => {
                e.preventDefault();

                saveSignInData();
              }}
            >
              save sign-in data in API Server
            </button>
          </ViewTokenData>
        </>
      )}
    </>
  );
};

export default TmpPage;
