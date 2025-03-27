import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import SSOSignIn from "./pages/sso-sign-in";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/sso/sign-in' element={<SSOSignIn />}  />
    </Routes>
  )
}

export default App;
