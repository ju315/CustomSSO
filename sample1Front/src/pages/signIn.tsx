import { useEffect, useState } from 'react';

import '../App.css';
import { getCookie, setCookie } from '../common/util';
import ViewTokenData from '../components/viewToken';

function SignIn() {
  const [tokenData, setTokenData] = useState<{
    accessToken: string;
    refreshToken: string;
  }>({ accessToken: '', refreshToken: '' });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('팝업으로부터 받은 메시지:', event.data);

      if (event.data.cookie) {
        const cookieData = event.data.cookie;
        setTokenData(cookieData);
        setCookie('token', JSON.stringify(cookieData));
      }
    };

    window.addEventListener('message', handleMessage);

    const jwtData = getCookie('token');
    console.log(jwtData);
    if (jwtData?.accessToken) {
      setTokenData(jwtData);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const signInWithClient = () => {
    const popup = window.open(
      'http://192.168.62.13:8080/api/v1/sso/sign-in',
      'SSO Sign-in',
      'width=800,height=600,scrollbars=yes',
    );

    if (!popup) {
      alert('팝업 차단 설정을 확인해 주세요.');
      return;
    }
  };

  const signInWithServer = (v: number) => {
    const returnUrl = encodeURI(`${window.location.origin}/tmp-page`);
    window.location.href = `http://192.168.62.13:8081/api/v1/view/check?v=${v}&returnUrl=${returnUrl}`;
  };

  return (
    <div>
      <div className="App">
        <h1>SSO Sign-in</h1>
        {/* <div style={{ marginBottom: '5px' }}>
          <button
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#00afff',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '7px',
              borderColor: 'white',
            }}
            onClick={(e) => {
              e.preventDefault();
              signInWithClient();
            }}
          >
            SSO Sign-in(w. Auth Client)
          </button>
        </div> */}
        <div>
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

              setCookie('apiVersion', '1');
              signInWithServer(1);
            }}
          >
            SSO sign-in(w. JWT)
          </button>
        </div>
        <div>
          <button
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#00afaf',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '7px',
              borderColor: 'white',
            }}
            onClick={(e) => {
              e.preventDefault();

              setCookie('apiVersion', '2');
              signInWithServer(2);
            }}
          >
            SSO sign-in(w. sessionDB)
          </button>
        </div>
      </div>
      {!!tokenData.accessToken && (
        <ViewTokenData tokenData={tokenData} setTokenData={setTokenData} />
      )}
    </div>
  );
}

export default SignIn;
