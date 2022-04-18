

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { isAuthenticated } from "../utils/isAuthenticated";
import { MySession } from "../types/session";

import User from '../components/user/User'
import spotify from "./api/spotify";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx) as MySession
	const logged = await isAuthenticated(session)
	
	if ( !logged ) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	
	const me = await spotify(session).me();

    const { display_name, followers, images, product } = me;

    const user = {
        name: display_name,
        followers,
        image: images[0].url,
        subscription: product
    }

	return { props: { me: user } };
}

export default User;