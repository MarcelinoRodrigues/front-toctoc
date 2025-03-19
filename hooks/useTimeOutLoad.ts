import { useEffect } from "react";

export function useTimeOutLoad(isloading: boolean, disableLoading: () => void) {  
    useEffect(() => {
        if(isloading){
            const timer = setTimeout(() => {
              disableLoading()
            }, 30000)
            return () => clearTimeout(timer)
        }
    }, [isloading])
  }