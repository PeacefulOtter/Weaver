import { signIn } from "next-auth/react";
import { useEffect } from "react";

const Home = () => {
    useEffect( () => {
        signIn("spotify", { callbackUrl: 'http://127.0.0.1:3000' } )
    }, [])

	return <div></div>
}

export default Home;