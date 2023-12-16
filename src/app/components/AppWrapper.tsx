"use client"
import usePBAuth from "../hooks/usePBAuth"

function AppWrapper({ children }: { children: React.ReactNode }) {
  // const dispatch = useDispatch<AppDispatch>()
  usePBAuth()
  // dispatch(setUser(db.client.authStore.model as UsersResponse))
  return <div>{children}</div>
}

export default AppWrapper
