import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

interface AuthContextType {
  token: string | null
  userType: "Admin" | "User" | null
  login: (token: string, type: "Admin" | "User") => void
  logout: () => void
  isLoggedIn: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [userType, setUserType] = useState<"Admin" | "User" | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("token")
    const storedType = localStorage.getItem("userType") as
      | "Admin"
      | "User"
      | null
    if (stored) {
      setToken(stored)
      setUserType(storedType)
    }
    setLoaded(true)
  }, [])

  function login(newToken: string, type: "Admin" | "User") {
    localStorage.setItem("token", newToken)
    localStorage.setItem("userType", type)
    setToken(newToken)
    setUserType(type)
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    setToken(null)
    setUserType(null)
  }

  if (!loaded) return null

  return (
    <AuthContext.Provider
      value={{
        token,
        userType,
        login,
        logout,
        isLoggedIn: !!token,
        isAdmin: userType === "Admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
