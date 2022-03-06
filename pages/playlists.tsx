import { asyncget, get } from "../assets/requests";
import Playlists from "../components/playlists";

const Home = ( { me, playlists } ) => {
    return (
        <div style={{display: 'flex'}}>
            <Playlists playlists={playlists}/>
            <div className="abc">
                <div className="userprofile" style={{backgroundImage: `url(${me.image})`}}></div>
                <div className="username">{me.name}</div>
                <div className="usersubscription">{me.subscription}</div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx: any) {
	const { me, playlists } = await asyncget( 'http://localhost:3000/api/spotify/playlists', {} )
    console.log(me, playlists);
    return { props: { me, playlists } }
}

export default Home;
