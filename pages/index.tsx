


import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Playlist from "../components/playlist/";
import Playlists from "../components/playlist/playlists";

import User from "../components/playlist/user";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { isAuthenticated } from "../utils/isAuthenticated";
import { MySession } from "../types/session";
import spotify from "./api/spotify/spotify";

const RenderHome = ( { me, playlists } ) => {

    const [playlistId, setPlaylistId] = useState<string | undefined>(undefined)

    return (
        <div style={{display: 'flex'}}>
            <Playlists playlists={playlists} setPlaylistId={setPlaylistId}/>
            { playlistId !== undefined 
                ? <Playlist id={playlistId} />
                : <User me={me}/>
            }
        </div>
    )
}


const Home = ( { me, playlists } ) => {
    
    return me && playlists 
        ? <RenderHome me={me} playlists={playlists} />
        : <></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx) as MySession
	console.log(session);
	
	const logged = await isAuthenticated(session)
	console.log(logged);
	
	if ( !logged ) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	
	const me = await spotify.me(session);
	const pls = await spotify.playlists(session);

    const { display_name, followers, images, product } = me;

    const playlists = pls.items.map( pl => { 
        const { id, images, name } = pl
        const image = images.length > 1 ? images[1].url : images[0].url
        return { id, name, image  }
    })

    const user = {
        name: display_name,
        followers,
        image: images[0].url,
        subscription: product
    }
	

	return { props: { me: user, playlists } };
}

export default Home;