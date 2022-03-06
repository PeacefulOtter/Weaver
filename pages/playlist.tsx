

import Header from "../components/playlist/header"
import Playlist from "../components/playlist/";
import Playlists from "../components/playlists";

import { asyncget } from "../assets/requests";

const Home = ( { playlists, playlist } ) => {
    return (
        <div>
            <Playlists playlists={playlists}/>
            <Header />
            <Playlist playlist={playlist}/>
        </div>
    )
}


export async function getServerSideProps(ctx: any) {
    const playlists = await asyncget( 'http://localhost:3000/api/spotify/playlists', {} )
	const playlist = await asyncget( 'http://localhost:3000/api/spotify/playlist', {id: 999} )
    return { props: { playlists, playlist } }
}

export default Home;