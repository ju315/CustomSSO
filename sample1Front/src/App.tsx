import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Home from './pages/home';
import SignIn from './pages/signIn';
import TmpPage from './pages/tmpPage';
import { clearCookie, getCookie } from './common/util';
import { jwtDecode } from 'jwt-decode';

function App() {
  const cookie = getCookie('token');
  const apiVersion = getCookie('apiVersion');

  const navigate = useNavigate();

  useEffect(() => {
    if (cookie && apiVersion === 2) {
      const at = jwtDecode(cookie.accessToken);

      fetch(
        `http://192.168.62.13:8081/api/v2/user/check-sign-in?s=${at.uuid}`,
        {
          method: 'GET',
        },
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);

          if (!res) {
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
