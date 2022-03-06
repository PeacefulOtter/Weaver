

import Header from "../components/playlist/header"
import Playlist from "../components/playlist/";
import Playlists from "../components/playlist/playlists/Playlists";

const Home = () => {

    return (
        <div>
            <Playlists />
            <Header />
            <Playlist />
        </div>
    )
}

export default Home;