import { Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import SignIn from './pages/signIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}

export default App;
