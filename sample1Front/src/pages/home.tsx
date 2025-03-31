import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jwtDecode } from 'jwt-decode';

import { clearCookie, getCookie } from '../common/util';

const Home = () => {
  const [tokenData, setTokenData] = useState({
    accessToken: '',
    refreshToken: '',
  });
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const cookie = getCookie('token');
    if (cookie) {
      setTokenData(cookie);
      setUserData(jwtDecode(cookie.accessToken));
    }
  }, []);

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
    <>
      <div>
        <h1>Home</h1>
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
    </>
  );
};

export default Home;
