import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UsersResponse } from "@/app/pocketbase-types"
type AuthState = {
  user: UsersResponse | false
}
type InitialState = {
  value: AuthState | object
}
const initialState = {
  value: {
    user: {} as AuthState,
  },
} as InitialState

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UsersResponse | false>) => {
      return {
        value: {
          user: action.payload,
        },
      }
    },
  },
})

export const { setUser } = auth.actions
export default auth.reducer
