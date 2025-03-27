import { useState } from 'react';
import './App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [resData, setResData] = useState<Partial<{accessToken: string, refreshToken: string}>>();

  return (
    <div className="App">
      <div>
        <div><span>Sign In</span></div>
          <div>
            <span>id</span>
            <input type="text" onChange={(e) => setUserId(e.target.value)}/>
          </div>
          <div>
            <span>password</span>
            <input type="password" onChange={(e) => setUserPw(e.target.value)}/>
          </div>
          <div>
            <button onClick={async (e) => {
              e.preventDefault();
              fetch('http://localhost:8081/user/sign-in', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId,
                  password: userPw
                }),
                credentials: 'include'
              })
              .then((res) => res.json())
              .then((res) => {
                console.log(res)
                setResData(res.data)
              })
              .catch((res) => console.log(res))
            }}>Sign In</button>
          </div>
      </div>
      {resData && (
        <div>
          <div><span>accessToken: {resData.accessToken}</span></div>
          <div><span>refreshToken: {resData.refreshToken}</span></div>
          <div><button>validate token</button></div>
        </div>
      )}
    </div>
  );
}

export default App;
