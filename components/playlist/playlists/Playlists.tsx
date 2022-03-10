
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Playlists.module.css' 


const Playlist = ( { id, name, image, setPlaylistId } ) => {

	const movePlaylist = (id: string) => () => setPlaylistId(id);

	return (
		<div className={styles.playlistwrapper} onClick={movePlaylist(id)}>
			<div className={styles.playlistname}>{name}</div>
		</div>
	)
}


{/* <button className={styles.burgerbtn + " btn"} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
=
</button> */}

const Playlists = ( { playlists, setPlaylistId } ) => {
	//  <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

	return (
		<div className={styles.playlists}>
			{ playlists.map( pl => 
				<Playlist 
					{...pl} 	
					setPlaylistId={setPlaylistId} 
					key={`playlist${Math.random()}`} />
			) } 
		</div>
	)
}

export default Playlists;