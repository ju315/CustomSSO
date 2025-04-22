import { useNavigate } from 'react-router-dom';

import { setCookie } from '../../common/util';
import { AUTH_FRONT, SIGN_TYPE_COOKIE_NAME } from '../../common/const';
import SignBtn from '../../components/signBtn';

import '../../App.css';
import { SignType } from '../../common/type';

const SignInList = () => {
  const navigate = useNavigate();

  const ssoSignIn = () => {
    const returnUrl = encodeURIComponent(`${window.location.origin}/tmp-page`);
    window.location.replace(`${AUTH_FRONT}/cookie-check?r=${returnUrl}`);
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
            setCookie(SIGN_TYPE_COOKIE_NAME, SignType.SSO);
            ssoSignIn();
          }}
        />
      </div>
    </div>
  );
};

export default SignInList;
