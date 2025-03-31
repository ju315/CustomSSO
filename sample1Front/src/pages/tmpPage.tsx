import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { setCookie } from '../common/util';
import ViewTokenData from '../components/viewToken';

const TmpPage = () => {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const [tokenData, setTokenData] = useState({
    accessToken: '',
    refreshToken: '',
  });

  useEffect(() => {
    console.log(query.get('accessToken'));
    console.log(query.get('refreshToken'));

    const at = query.get('accessToken');
    const rt = query.get('refreshToken');

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

  return (
    <>
      <h1>Temporary Page</h1>
      {!!tokenData.accessToken && (
        <>
          <ViewTokenData tokenData={tokenData} setTokenData={setTokenData}>
            <button
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
