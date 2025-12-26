import {BACKEND_ACCESS_TOKEN_LIFETIME} from '@/lib/auth/constants'

export const authConfig = {
  session: {
    strategy: 'jwt',
    maxAge: BACKEND_ACCESS_TOKEN_LIFETIME, // 1 Day
   },
   providers: [],
  }