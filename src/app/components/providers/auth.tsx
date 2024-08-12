'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthClient } from '@dfinity/auth-client'

import { canisterId, createActor } from '@/declarations/internet_identity'

const AuthContext = createContext({
  isAuth: false,
  authUser: null,
  identity: null,
  principal: null,
  callFunction: null,
  login: () => {},
  logout: () => {}
})

const identityProvider = process.env.DFX_NETWORK === 'local'
  ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`
  : 'https://identity.ic0.app'

const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true
    }
  },
  loginOptions: {
    identityProvider
  }
}

export const useAuthClient = (options = defaultOptions) => {
  const [isAuth, setIsAuth] = useState(false)
  const [authUser, setAuthUser] = useState(null)
  const [identity, setIdentity] = useState(null)
  const [principal, setPrincipal] = useState(null)
  const [callFunction, setCallFunction] = useState(null)

  useEffect(() => {
    AuthClient.create(options.createOptions)
      .then(async client => updateClient(client))
  }, [])

  const updateClient = async (client: any) => {
    const isAuthenticated = await client.isAuthenticated()
    const identity = client.getIdentity()
    const principal = identity.getPrincipal()
    setIsAuth(isAuthenticated)
    setIdentity(identity)
    setPrincipal(principal)
    setAuthUser(client)

    const actor = createActor(canisterId, {
      agentOptions: {
        identity
      }
    })

    // @ts-ignore
    setCallFunction(actor)
  }

  const login = () => {
    // @ts-ignore
    authUser?.login({
      ...options.loginOptions,
      onSuccess: () => updateClient(authUser)
    })
  }

  const logout = async () => {
    // @ts-ignore
    await authUser?.logout()
    await updateClient(authUser)
  }

  return {
    isAuth,
    authUser,
    identity,
    principal,
    callFunction,
    login,
    logout
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthClient()

  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
