import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './SignIn.css';
import { setCookie } from '../../common/util';
import { sampleApi } from '../../common/axios';

enum SignType {
  BASE = 'BASE',
  SYSTEM = 'SYSTEM',
  SSO = 'SSO',
}

interface SignData {
  userId: string;
  password: string;
}

const SignIn = () => {
  const [query] = useSearchParams();

  const [signType, setSignType] = useState<SignType>(SignType.BASE);
  const [signData, setSignData] = useState<SignData>({
    userId: '',
    password: '',
  });

  useEffect(() => {
    const type = query.get('t');

    if (type && type in SignType) {
      setSignType(SignType[type as keyof typeof SignType]);
    }
  }, [query]);

  const onClickSignInBtn = () => {
    setCookie('SIGN-TYPE', signType);
    sampleApi('');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Sign-in</h1>
      <div className="container">
        <label>
          <b>Username</b>
        </label>
        <input
          required
          type="text"
          placeholder="Enter Username"
          name="uname"
          onChange={(e) => {
            setSignData((prev) => {
              return {
                ...prev,
                userId: e.target.value,
              };
            });
          }}
        />
        <label>
          <b>Password</b>
        </label>
        <input
          required
          type="password"
          placeholder="Enter Password"
          name="psw"
          onChange={(e) => {
            setSignData((prev) => {
              return {
                ...prev,
                password: e.target.value,
              };
            });
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            window.alert(JSON.stringify(signData));
            onClickSignInBtn();
          }}
        >
          Sign-In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
