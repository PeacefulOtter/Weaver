
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSpotify } from '../../context/SpotifyContext';

import styles from './Playlists.module.css' 
import 'bootstrap/dist/css/bootstrap.min.css';


const Playlist = ( { id, name, image, setPlaylistId } ) => {

	const router = useRouter()
	const { playlistID } = router.query

	const activeStyle = id === playlistID ? styles.playlistActiveWrapper : undefined

	return (
		<div className={styles.playlistwrapper + ' ' + activeStyle} onClick={setPlaylistId(id)}>
			<div className={styles.playlistname}>{name}</div>
		</div>
	)
}

const Playlists = () => {

	const { playlists, fetchPlaylists } = useSpotify()	

	const router = useRouter()

	useEffect( () => { fetchPlaylists() }, [] )

	const setPlaylistId = (id: string) => () => {
		router.push('/' + id)
	}

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