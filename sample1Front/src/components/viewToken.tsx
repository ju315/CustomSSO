import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { clearCookie } from '../common/util';

interface props {
  tokenData: { accessToken: string; refreshToken: string };
  setTokenData: any;
  children?: ReactNode;
}
const ViewTokenData = ({ tokenData, setTokenData, children }: props) => {
  const navigator = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setUserData(jwtDecode(tokenData.accessToken));
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
    navigator('/sign-in');
  };

  const onClickSingOut = () => {
    clearCookie('token');

    window.location.reload();
  };

  return (
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
          <button
            onClick={(e) => {
              e.preventDefault();
              const confirm = window.confirm('Really Sign out?');

              if (confirm) {
                onClickSingOut();
              }
            }}
          >
            sign-out
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default ViewTokenData;
