import React from 'react'

const Signup = () => {
  return (
    <div>
      <form >
            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" />
        </form>
    </div>
  )
}

export default Signup