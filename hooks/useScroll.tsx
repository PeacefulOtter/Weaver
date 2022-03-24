import { useEffect, useState } from "react"

const useScroll = <T extends any>(defaultVal: T, ref: any, cb: (ref: any, scrollY: number) => T): T => {
    const [res, setRes] = useState<T>(defaultVal)

    useEffect( () => {
        const scrollHandler = (e: any) => {
            if (ref !== null && ref.current !== null )
                setRes(cb(ref, window.scrollY))
        }
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [])

    return res
}

export default useScroll;