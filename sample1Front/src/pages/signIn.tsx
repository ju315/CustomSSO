import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import '../App.css';
import { clearCookie, getCookie, setCookie } from '../common/util';

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

  const onClickBtn = () => {
    const popup = window.open(
      'http://localhost:8080/sso/sign-in',
      'SSO Sign-in',
      'width=800,height=600,scrollbars=yes',
    );

    if (!popup) {
      alert('팝업 차단 설정을 확인해 주세요.');
      return;
    }
  };

  const onClickValidateBtn = () => {};

  const onClickCookieClear = () => {
    clearCookie('token');

    setUserData(null);
    setTokenData({
      accessToken: '',
      refreshToken: '',
    });
  };

  return (
    <div>
      <div className="App">
        <h1>SSO Sign-in</h1>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClickBtn();
            }}
          >
            SSO Sign-in
          </button>
        </div>
      </div>
      {!!tokenData.accessToken && (
        <>
          <hr />
          <div>
            <div>
              <span style={{ textAlign: 'left' }}>accessToken</span>
              <div>
                <SyntaxHighlighter language="textlie" style={coldarkDark}>
                  {tokenData.accessToken}
                </SyntaxHighlighter>
              </div>
            </div>
            <div>
              <span style={{ textAlign: 'left' }}>refreshToken</span>
              <SyntaxHighlighter language="textlie" style={coldarkDark}>
                {tokenData.refreshToken}
              </SyntaxHighlighter>
            </div>
            <div>
              <span style={{ textAlign: 'left' }}>token data</span>
              <div>
                <SyntaxHighlighter language="javascript" style={coldarkDark}>
                  {JSON.stringify(userData)}
                </SyntaxHighlighter>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                disabled
                onClick={(e) => {
                  e.preventDefault();
                  onClickValidateBtn();
                }}
              >
                validate token
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onClickCookieClear();
                }}
              >
                clear cookie
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignIn;
