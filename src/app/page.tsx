'use client'

import { useAuth } from './components/providers/auth'

const Home = () => {
  const { isAuth, principal, login, logout } = useAuth()
  console.log('principal', principal)

  const onAuth = () => {
    isAuth ? logout() : login()
  }

  return (
    <div>
      <button onClick={onAuth}>
        {isAuth ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}

export default Home
