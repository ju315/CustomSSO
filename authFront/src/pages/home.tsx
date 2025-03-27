import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import '../App.css';
import { clearCookie, getCookie } from '../common/util';

function Home() {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [tokenData, setTokenData] = useState<{
    accessToken: string;
    refreshToken: string;
  }>({ accessToken: '', refreshToken: '' });

  useEffect(() => {
    // cookie의 token 데이터 조회하여 state init.
    const jwtData = getCookie('token');

    if (jwtData?.accessToken) {
      setTokenData(jwtData);
      setUserData(jwtDecode(jwtData.accessToken));
    }
  }, []);

  useEffect(() => {
    if (!!tokenData.accessToken && window.opener) {
      // popup으로 로그인 요청시 부모 브라우저에게 전달하고 창 닫기.
      const cookie = getCookie('token');
      window.opener.postMessage({ cookie }, '*');

      window.close();
    }
  }, [tokenData]);

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
        <form action="">
          <div>
            <h1>Sign In</h1>
          </div>
          <div>
            <span>id</span>
            <input type="text" onChange={(e) => setUserId(e.target.value)} />
          </div>
          <div>
            <span>password</span>
            <input
              type="password"
              onChange={(e) => setUserPw(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                fetch('http://localhost:8081/user/sign-in', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId,
                    password: userPw,
                  }),
                  credentials: 'include',
                })
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(res);
                    setTokenData(res.data);
                    const data = jwtDecode(res.data.accessToken);
                    console.log(data);
                    console.log(typeof data);
                    setUserData(data);
                  })
                  .catch((res) => console.log(res));
              }}
            >
              Sign In
            </button>
          </div>
        </form>
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

export default Home;
