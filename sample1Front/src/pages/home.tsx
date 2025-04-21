import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCookie } from '../common/util';
import ViewTokenData from '../components/viewToken';
import { sampleApi } from '../common/axios';
import SignBtn from '../components/signBtn';

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
    navigator('/sign-in-list');
  };

  const requestAPIServer = () => {
    sampleApi
      .post('/api/user/test')
      .then((res) => alert('Test success.'))
      .catch((err) => {
        console.error(err.response.data.message);

        if (err.status === 401) {
          alert('Already sign-out session!');
        }
      });
  };
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      {!!tokenData.accessToken ? (
        <ViewTokenData tokenData={tokenData} setTokenData={setTokenData}>
          <button
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#5f5fff',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '7px',
              borderColor: 'white',
            }}
            onClick={(e) => {
              e.preventDefault();
              requestAPIServer();
            }}
          >
            Test request Sample Server
          </button>
        </ViewTokenData>
      ) : (
        <SignBtn
          title="Go Sign type List"
          btnColor="#5f5fff"
          onClick={() => {
            navigator('/sign-in-list');
          }}
        />
      )}
    </>
  );
};

export default Home;
