import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { setCookie } from '../common/util';

const TmpPage = () => {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const [tokenData, setTokenData] = useState({
    accessToken: '',
    refreshToken: '',
  });
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    console.log(query.get('accessToken'));
    console.log(query.get('refreshToken'));

    const at = query.get('accessToken');
    const rt = query.get('refreshToken');

    if (at && rt) {
      setCookie(
        'token',
        JSON.stringify({
          accessToken: at,
          refreshToken: rt,
        }),
      );

      setTokenData({
        accessToken: at,
        refreshToken: rt,
      });

      const data = jwtDecode(at);
      setUserData(data);
    }
  }, []);

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <h1>Temporary Page</h1>
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
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  goHome();
                }}
              >
                go home
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TmpPage;
