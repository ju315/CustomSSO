import { Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import SignIn from './pages/signIn';
import TmpPage from './pages/tmpPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/tmp-page" element={<TmpPage />} />
    </Routes>
  );
}

export default App;
