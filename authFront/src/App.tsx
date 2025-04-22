import { Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import SignIn from './pages/signIn';
import CookieCheck from './pages/cookieCheck';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cookie-check" element={<CookieCheck />} />
      <Route path="sign-in" element={<SignIn />} />
    </Routes>
  );
}

export default App;
