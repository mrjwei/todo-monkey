import {createContext} from 'react'
import {User} from 'firebase/auth'
import {Firebase} from '@/features/firebase'

export const SessionContext = createContext<{firebase: Firebase | null, authenticatedUser: User | null, isLoading: boolean}>({firebase: null, authenticatedUser: null, isLoading: true})