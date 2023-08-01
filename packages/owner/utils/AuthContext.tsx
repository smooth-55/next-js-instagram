import { createContext, Dispatch, SetStateAction } from "react"

type ContextProps = {
  loading?: boolean
  user?: UserInfoProps
  authenticated?: boolean
  setUser?: Dispatch<any>
  logout?: () => void
  setAuthenticated?: (auth: boolean) => void
  children: React.ReactNode
  setLoading?: Dispatch<SetStateAction<boolean>>
}

type AuthProviderProps = {
  loading?: boolean
  user?: UserInfoProps
  setUser?: Dispatch<any>
  children?: React.ReactNode
  setLoading?: Dispatch<SetStateAction<boolean>>
  authenticated?: boolean
  setAuthenticated?: Dispatch<SetStateAction<boolean>>
}
export interface UserDetailProps {
  id: Number
  username: string
  email: string
  full_name: string
  phone: string
  gender: string
  is_private: boolean
}

export interface UserInfoProps {
  id: Number
  username: string
  email: string
  full_name: string
  phone: string
  gender: string
  is_private: boolean,
  my_followers?: UserDetailProps[]
  my_following?: UserDetailProps[]
}

export const AuthContext = createContext<Partial<ContextProps>>({})


export const AuthProvider = ({
  user,
  loading,
  setUser,
  children,
  setLoading,
  authenticated,
  setAuthenticated
}: AuthProviderProps) => {
  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        user,
        setUser,
        children,
        setLoading,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
