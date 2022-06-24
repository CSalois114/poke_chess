import { useState } from 'react'

export default function Login({ setCurrentUser, toggleIsHasAccount }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
       }),
    })
      .then((r) => r.json())
      .then(setCurrentUser);
  }
 
  return (
    <div id="login">
      <h2 className='listHeader'>Login</h2>
      <form  onSubmit={handleSubmit}>
      <ul className="auth defaultList">
          <li>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li> 
            <input
              type="password"
              id="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit">Login</button>
          </li>
          <li className="authSwitch">
            <div onClick={toggleIsHasAccount}>Create A New Account</div>
          </li>
        </ul> 
      </form>
    </div>
  );
}
