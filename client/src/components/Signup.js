import { useState } from 'react'

export default function Signup({ setCurrentUser, toggleIsHasAccount }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((r) => r.json())
      .then(setCurrentUser)
  }
 
  return (
    <div id="signup" >
      <h2 className='listHeader'>Create an Account</h2>
      <form onSubmit={handleSubmit}>
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
            <input
              type="password"
              id="password_confirmation"
              placeholder='Password Confirmation'
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </li>
          <li>
            <button type="submit">Create Account</button>
          </li>
          <li className="authSwitch">
            <div onClick={toggleIsHasAccount}>Already Have an Account</div>
          </li>
        </ul>  
      </form>
    </div> 
  );
}
