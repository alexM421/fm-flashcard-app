import type { Session } from "@supabase/supabase-js"
import { createContext, useContext } from "react"

export const AuthContext = createContext<undefined | Session | null>(undefined)


export function useAuthContext(): Session | null {
    const context = useContext(AuthContext)

    if(context===undefined){
        throw new Error("Outside of AuthContext provider")
    }

    return context
}

