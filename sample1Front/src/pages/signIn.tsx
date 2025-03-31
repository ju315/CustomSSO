import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import '../App.css';
import { clearCookie, getCookie, setCookie } from '../common/util';
import ViewTokenData from '../components/viewToken';

function SignIn() {
  const [tokenData, setTokenData] = useState<{
    accessToken: string;
    refreshToken: string;
  }>({ accessToken: '', refreshToken: '' });
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('팝업으로부터 받은 메시지:', event.data);

      if (event.data.cookie) {
        const cookieData = event.data.cookie;
        setTokenData(cookieData);
        setCookie('token', JSON.stringify(cookieData));
        const data = jwtDecode(cookieData.accessToken);
        console.log(data);
        console.log(typeof data);
        setUserData(data);
      }
    };

    window.addEventListener('message', handleMessage);

    const jwtData = getCookie('token');
    console.log(jwtData);
    if (jwtData?.accessToken) {
      setTokenData(jwtData);
      setUserData(jwtDecode(jwtData.accessToken));
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const signInWithClient = () => {
    const popup = window.open(
      'http://192.168.62.13:8080/sso/sign-in',
      'SSO Sign-in',
      'width=800,height=600,scrollbars=yes',
    );

    if (!popup) {
      alert('팝업 차단 설정을 확인해 주세요.');
      return;
    }
  };

  const signInWithServer = () => {
    const returnUrl = encodeURIComponent(`${window.location.origin}/tmp-page`);
    console.log('return url:: ', returnUrl);

    window.location.href = `http://192.168.62.13:8081/view/check?returnUrl=${returnUrl}`;
  };

  return (
    <div>
      <div className="App">
        <h1>SSO Sign-in</h1>
        <div style={{ marginBottom: '5px' }}>
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
        </div>
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
              signInWithServer();
            }}
          >
            SSO sign-in(w. Auth Server)
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
