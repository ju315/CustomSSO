import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { getCookie, getVersionPrefix } from '../../common/util';
import SignBtn from '../../components/signBtn';
import { sampleApi } from '../../common/axios';
import { SIGN_TYPE_COOKIE_NAME, USER_COOKIE_NAME } from '../../common/const';

const My = () => {
  const navigator = useNavigate();

  const me = getCookie(USER_COOKIE_NAME);
  const signType = getCookie(SIGN_TYPE_COOKIE_NAME);
  const versionPrefix = getVersionPrefix(signType);

  useEffect(() => {
    if (!me) {
      navigator('/');
    }
  }, [navigator, me]);

  const onClickRequest = async () => {
    try {
      const res = await sampleApi.post(`/user/test`);
      window.alert(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickSignOut = async () => {
    try {
      const res = await sampleApi.post(`/${versionPrefix}/user/sign-out`, {
        sid: me.sessionId,
      });

      if (res.data.res) {
        window.location.href = '/';
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>My Info</h1>
      <div>
        <SyntaxHighlighter language="javascript" style={coldarkDark}>
          {JSON.stringify(me, null, 2)}
        </SyntaxHighlighter>
      </div>
      <SignBtn
        title="do something server"
        btnColor="#0087ff"
        onClick={() => {
          onClickRequest();
        }}
      />
      <SignBtn
        title="Sign-out"
        btnColor="#ff005f"
        onClick={() => {
          onClickSignOut();
        }}
      />
    </div>
  );
};

export default My;
