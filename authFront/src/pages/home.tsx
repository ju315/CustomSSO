import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import '../App.css';
import { clearCookie, getCookie, setCookie } from '../common/util';

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

  const onClickSignIn = () => {
    if (!userId || !userPw) {
      alert('enter id or password');
      return;
    }

    fetch('http://192.168.62.13:8081/user/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        password: userPw,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setTokenData(res.data);
        setCookie('token', res.data);
        const data = jwtDecode(res.data.accessToken);

        setUserData(data);
      })
      .catch((res) => console.log(res));
  };

  const onClickValidateBtn = () => {
    fetch('http://192.168.62.13:8081/user/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenData.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 401) {
          alert(res.message);
          onClickCookieClear();
        } else {
          alert('The token is still valid.');
        }
      })
      .catch((res) => {
        console.error(res);
      });
  };

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
        <div>
          <h1>Sign In</h1>
        </div>
        <fieldset>
          <form action="">
            <table style={{ margin: 'auto' }}>
              <tr>
                <td>
                  <label htmlFor="userId">ID</label>
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password">PASSWORD</label>
                </td>
                <td>
                  <input
                    type="password"
                    onChange={(e) => setUserPw(e.target.value)}
                  />
                </td>
              </tr>
            </table>
            <div style={{ marginTop: '10px' }}>
              <button
                style={{
                  width: '100px',
                  height: '30px',
                  backgroundColor: '#5f5fff',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '7px',
                  borderColor: 'white',
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  onClickSignIn();
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        </fieldset>
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
