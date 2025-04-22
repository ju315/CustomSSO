import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './SignIn.css';
import { authApi } from '../../common/axios';

interface SignData {
  userId: string;
  password: string;
}

const SignIn = () => {
  const [query] = useSearchParams();
  const [signData, setSignData] = useState<SignData>({
    userId: '',
    password: '',
  });

  const onClickSignInBtn = async () => {
    try {
      const res = await authApi.post('/user/sign-in', {
        ...signData,
        signType: 'SSO',
      });

      const r = query.get('r');
      window.location.href = `${r}?u=${encodeURIComponent(
        JSON.stringify(res.data),
      )}`;
    } catch (err) {
      console.error(err);
      window.alert('error!');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>SSO Sign-in</h1>
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
