import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { clearCookie, getCookie } from '../common/util';
import { AUTH_BACK, SAMPLE_BACK } from '../common/const';
import { authApi } from '../common/axios';

interface props {
  tokenData: { accessToken: string; refreshToken: string };
  setTokenData: React.Dispatch<
    React.SetStateAction<{
      accessToken: string;
      refreshToken: string;
    }>
  >;
  children?: ReactNode;
}
const ViewTokenData = ({ tokenData, setTokenData, children }: props) => {
  const navigator = useNavigate();
  const apiVersion = getCookie('apiVersion');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setUserData(jwtDecode(tokenData.accessToken));
  }, []);

  const onClickValidateBtn = async () => {
    try {
      await authApi.post('/api/v1/user/validate');
    } catch (err) {
      console.error('token validate get error. ', err);
    }
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

    const returnUrl = encodeURIComponent(window.location.origin);
    let hrefUrl = `${AUTH_BACK}/api/v${apiVersion}/view/sign-out?r=${returnUrl}`;

    if (apiVersion === 2) {
      const serverUrl = encodeURIComponent(`${SAMPLE_BACK}`);
      hrefUrl += `&u=${userData.uuid}&s=${serverUrl}`;
    }

    window.location.href = hrefUrl;
  };

  return (
    <>
      <hr />
      <div>
        <div>
          <h2>api version: {apiVersion}</h2>
        </div>
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
        <div style={{ display: 'flex' }}>
          <button
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#a8a8a8',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '7px',
              borderColor: 'white',
            }}
            onClick={(e) => {
              e.preventDefault();
              onClickValidateBtn();
            }}
          >
            validate token
          </button>
          <button
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#ff005f',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '7px',
              borderColor: 'white',
            }}
            onClick={(e) => {
              e.preventDefault();
              onClickCookieClear();
            }}
          >
            clear cookie
          </button>
          <button
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#d70000',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '7px',
              borderColor: 'white',
            }}
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
