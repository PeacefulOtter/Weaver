
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSpotify } from '../../context/SpotifyContext';
import spotify from '../../pages/api/spotify';
import { MySession } from '../../types/session';

import styles from './Playlists.module.css' 


const Playlist = ( { id, name, image, setPlaylistId } ) => {

	return (
		<div className={styles.playlistwrapper} onClick={setPlaylistId(id)}>
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