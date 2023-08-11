import Head from "next/head"
import * as Sentry from "@sentry/node"
import { AppProps } from "next/app"
import { API } from "@project/shared"
import { useEffect, useState } from "react"
import { message } from "antd"
import { CloseCircleFilled } from "@ant-design/icons"
import { QueryClient, QueryClientProvider } from "react-query"
import { GlobalStyles, AuthProvider, UserInfoProps } from "../utils"
import "../utils/css-imports"
import Layout from "../components/molecules/Layout"
import { useRouter } from "next/router"
import WebsocketProvider from "../utils/WebsocketContext"

const queryClient = new QueryClient({ defaultOptions: {} })

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV !== "development",
    environment: `owner-${process.env.NODE_ENV}`,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserInfoProps>()
  const [authenticated, setAuthenticated] = useState(true)

  const router = useRouter()
  const initialLoad = async () => {
    const idToken = localStorage.getItem("USER_ACCESS_TOKEN")
    if (!idToken) {
      setAuthenticated(false)
      setLoading(false)
      setUser(null)
    }
    const paths = ["/login", "/register"]

    if (!paths.includes(window.location.pathname)) {
      try {

        const profile = await API.get("/profile")
        if (profile) {
          const user = profile?.data?.user
          setUser({ ...user, my_followers: user?.followers, my_following: user?.following })
          setLoading(false)
          setAuthenticated(true)
          router.push("/")
        }
      } catch {
        message.error({
          key: "01",
          icon: <CloseCircleFilled onClick={() => message.destroy("01")} />,
          content: "Unauthorized user",
        })
      }
    }


  }

  useEffect(() => {
    initialLoad()
  }, [])

  return (
    <>
      <Head>
        <title>{"Owner"}</title>
      </Head>
      <Layout>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <AuthProvider
            loading={loading}
            user={user}
            setUser={setUser}
            setLoading={setLoading}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          >
            <WebsocketProvider>
              <Component {...pageProps} />
            </WebsocketProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Layout>
    </>
  )
}

export default MyApp
