import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './SignIn.css';
import { getVersionPrefix, setCookie } from '../../common/util';
import { sampleApi } from '../../common/axios';
import { SignType } from '../../common/type';
import { SIGN_TYPE_COOKIE_NAME } from '../../common/const';

interface SignData {
  userId: string;
  password: string;
}

const SignIn = () => {
  const navigator = useNavigate();
  const [query] = useSearchParams();

  const [signType, setSignType] = useState<SignType>(SignType.BASE);
  const [signData, setSignData] = useState<SignData>({
    userId: '',
    password: '',
  });
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    const type = query.get('t');

    if (type && type in SignType) {
      setSignType(SignType[type as keyof typeof SignType]);
      setVersion(getVersionPrefix(type as SignType));
    }
  }, [query]);

  const onClickSignInBtn = async () => {
    try {
      const res = await sampleApi.post(`/${version}/user/sign-in`, {
        ...signData,
        signType,
      });

      setCookie(SIGN_TYPE_COOKIE_NAME, signType);
      console.log(res.data);
      navigator('/my');
    } catch (err) {
      console.error(err);
    }
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
