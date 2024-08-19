'use client'

import Storage from '@/components/storage/storage'
import { useAuth } from '../components/providers/auth'
import { Button } from '@/components/ui/button'

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

      <Button>Hello</Button>

      <Storage />
    </div>
  )
}

export default Home
