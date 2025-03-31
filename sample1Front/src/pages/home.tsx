import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCookie } from '../common/util';
import ViewTokenData from '../components/viewToken';

const Home = () => {
  const navigator = useNavigate();
  const [tokenData, setTokenData] = useState({
    accessToken: '',
    refreshToken: '',
  });

  useEffect(() => {
    const cookie = getCookie('token');
    if (cookie) {
      setTokenData(cookie);
    }
  }, []);

  const onClickSingIn = () => {
    navigator('/sign-in');
  };

  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      {!!tokenData.accessToken ? (
        <ViewTokenData tokenData={tokenData} setTokenData={setTokenData} />
      ) : (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClickSingIn();
            }}
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#5f5fff',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '7px',
              borderColor: 'white',
            }}
          >
            sing in
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
