import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Playlists.module.css' 

export interface PlaylistModel {
    name: string;
    image: string;
    id: string;
}


const Playlist = ( { id, name, image } ) => {

	const movePlaylist = (id: string) => () => {
		console.log(id);
	}

	return (
		<div className={styles.playlistwrapper} onClick={movePlaylist(id)}>
			<div className={styles.playlistimg + " img"} style={{backgroundImage: `url(${image})`}}></div>
			<div className={styles.playlistname}>{name}</div>
		</div>
	)
}


{/* <button className={styles.burgerbtn + " btn"} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
=
</button> */}

const Playlists = ( { playlists } ) => {
	//  <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

	return (
		<div className={styles.playlists}>
			{ playlists.map( pl => 
				<Playlist {...pl} key={`playlist${Math.random()}`} />
			) } 
		</div>
	)
}

export default Playlists;