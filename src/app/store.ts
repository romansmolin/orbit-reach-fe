import { configureStore } from '@reduxjs/toolkit'

import { accountsApi } from '@/entities/account/api/client/account.api'
import { emailApi } from '@/entities/email/api/client/email.api'
import { postApi } from '@/entities/post'
import { userApi } from '@/entities/user'

export const store = configureStore({
    reducer: {
        [accountsApi.reducerPath]: accountsApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [emailApi.reducerPath]: emailApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(accountsApi.middleware)
            .concat(postApi.middleware)
            .concat(userApi.middleware)
            .concat(emailApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
