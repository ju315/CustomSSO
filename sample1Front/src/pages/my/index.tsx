import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { getCookie } from '../../common/util';
import SignBtn from '../../components/signBtn';
import { sampleApi } from '../../common/axios';
import { SignType } from '../../common/type';
import { SIGN_TYPE_COOKIE_NAME, USER_COOKIE_NAME } from '../../common/const';

const My = () => {
  const navigator = useNavigate();

  const me = getCookie(USER_COOKIE_NAME);
  const signType = getCookie(SIGN_TYPE_COOKIE_NAME);

  const versionPrefix =
    signType === SignType.BASE
      ? 'v1'
      : signType === SignType.SYSTEM
      ? 'v2'
      : 'v3';

  useEffect(() => {
    if (!me) {
      navigator('/');
    }
  }, [navigator, me]);

  const onClickRequest = async () => {
    try {
      const res = await sampleApi.post(`/${versionPrefix}/user/test`);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickSignOut = async () => {
    try {
      await sampleApi.post(`/${versionPrefix}/user/sign-out`, {
        sid: me.sessionId,
      });

      window.location.href = '/';
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
