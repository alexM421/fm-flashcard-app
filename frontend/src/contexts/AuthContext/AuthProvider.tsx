import { useEffect, useState } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "../../lib/supabase"
import { AuthContext } from "./AuthContext"


const AuthProvider = ({children} : {children: React.ReactNode}) => {

    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        let initialized = false
      
        const { data: { subscription } } =
          supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)
      
            if (initialized) return
            initialized = true
      
            if (!session) {
              console.log('Creating anonymous session...')
              await supabase.auth.signInAnonymously()
            }
          })
      
        return () => subscription.unsubscribe()
      }, [])
      
    const value="value"

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthProvider }