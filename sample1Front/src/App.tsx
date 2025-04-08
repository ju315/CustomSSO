import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Home from './pages/home';
import SignIn from './pages/signIn';
import TmpPage from './pages/tmpPage';
import { clearCookie, getCookie } from './common/util';
import { TokenData } from './common/type/index';
import { sampleApi } from './common/axios';

function App() {
  const cookie = getCookie('token');
  const apiVersion = getCookie('apiVersion');

  const navigate = useNavigate();

  useEffect(() => {
    if (cookie && apiVersion === 2) {
      const at = jwtDecode(cookie.accessToken) as TokenData;

      sampleApi
        .post('/api/user/check-sign-in', {
          s: at.uuid,
        })
        .then((res) => {
          if (!res.data.data) {
            clearCookie('token');
            navigate('/');
          }
        })
        .catch((err) => {
          console.error('user sign-in check res get error.', err);
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/tmp-page" element={<TmpPage />} />
    </Routes>
  );
}

export default App;
