import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Home from './pages/home';
import SignIn from './pages/signIn';
import TmpPage from './pages/tmpPage';
import { clearCookie, getCookie } from './common/util';
import { TokenData } from './common/type/index';

function App() {
  const cookie = getCookie('token');
  const apiVersion = getCookie('apiVersion');

  const navigate = useNavigate();

  useEffect(() => {
    if (cookie && apiVersion === 2) {
      const at = jwtDecode(cookie.accessToken) as TokenData;
      const url = `http://${window.location.hostname}`;

      fetch(`${url}:8001/api/user/check-sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ s: at.uuid }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);

          if (!res.data) {
            clearCookie('token');

            navigate('/');
          }
        })
        .catch((err) => console.log(err));
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
