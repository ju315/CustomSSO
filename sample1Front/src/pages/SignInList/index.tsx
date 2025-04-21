import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCookie, setCookie } from '../../common/util';
import { AUTH_BACK } from '../../common/const';
import SignBtn from '../../components/signBtn';

import '../../App.css';

const SignInList = () => {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState<{
    accessToken: string;
    refreshToken: string;
  }>({ accessToken: '', refreshToken: '' });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('팝업으로부터 받은 메시지:', event.data);

      if (event.data.cookie) {
        const cookieData = event.data.cookie;
        setTokenData(cookieData);
        setCookie('token', JSON.stringify(cookieData));
      }
    };

    window.addEventListener('message', handleMessage);

    const jwtData = getCookie('token');
    console.log(jwtData);
    if (jwtData?.accessToken) {
      setTokenData(jwtData);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const signInWithClient = () => {
    const popup = window.open(
      'http://192.168.62.13:8080/api/v1/sso/sign-in',
      'SSO Sign-in',
      'width=800,height=600,scrollbars=yes',
    );

    if (!popup) {
      alert('팝업 차단 설정을 확인해 주세요.');
      return;
    }
  };

  const signInWithServer = (v: number) => {
    const returnUrl = encodeURI(`${window.location.origin}/tmp-page`);
    // window.location.href = `${AUTH_BACK}/api/v1/view/check?v=${v}&r=${returnUrl}`;
    window.location.replace(
      `${AUTH_BACK}/api/v1/view/check?v=${v}&r=${returnUrl}`,
    );
  };

  return (
    <div>
      <div className="App">
        <h1>Sign-in type list</h1>
        <SignBtn
          title="Base Sign-in"
          btnColor="#00afff"
          onClick={() => {
            navigate('/sign-in?t=BASE');
          }}
        />
        <SignBtn
          title="User System Sign-in"
          btnColor="#5f5fff"
          onClick={() => {
            navigate('/sign-in?t=SYSTEM');
          }}
        />
        <SignBtn
          title="User System Sign-in(w. SSO)"
          btnColor="#00afaf"
          onClick={() => {
            setCookie('apiVersion', '2');
            signInWithServer(2);
          }}
        />
      </div>
    </div>
  );
};

export default SignInList;
