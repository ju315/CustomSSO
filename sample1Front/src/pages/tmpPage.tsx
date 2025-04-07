import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { setCookie } from '../common/util';
import ViewTokenData from '../components/viewToken';
import { TokenData } from '../common/type';
import { SAMPLE_BACK } from '../common/const';

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

      saveSignInData(at, rt);
    }
  }, []);

  const goHome = () => {
    navigate('/');
  };

  const saveSignInData = (at: string, rt: string) => {
    fetch(`${SAMPLE_BACK}/api/v2/user/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: at,
        refreshToken: rt,
        sessionId: (jwtDecode(at) as TokenData).uuid,
      }),
    })
      .then((res) => res.json())
      .then((res) =>
        console.log('Save in Sign-in data in server result:: ', res),
      )
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
          </ViewTokenData>
        </>
      )}
    </>
  );
};

export default TmpPage;
