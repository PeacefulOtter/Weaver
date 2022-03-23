
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSpotify } from '../../context/SpotifyContext';

import styles from './Playlists.module.css' 
import 'bootstrap/dist/css/bootstrap.min.css';


const Playlist = ( { id, name, image, setPlaylistId, isMinimal } ) => {

	const router = useRouter()
	const { playlistID } = router.query

	const emoji = name.match(/\p{Emoji}+/gu)[0].replace('2022', '🎵').replace('2021', '🎵')
	const nameEmoji = name.replace(emoji, '')

	let style = styles.playlistwrapper + ' ' 
		+ (id === playlistID ? styles.playlistActiveWrapper : '') + ' '

	return (
		<div className={style} onClick={setPlaylistId(id)}>
			<div className={styles.playlistEmoji}>{emoji}</div>
			<div className={styles.playlistName}>{nameEmoji}</div>
		</div>
	)
}

const Playlists = () => {

	const { playlists, fetchPlaylists } = useSpotify()	
	const [minimal, setMinimal] = useState<boolean>(true);

	const router = useRouter()

	useEffect( () => { fetchPlaylists() }, [] )

	const setPlaylistId = (id: string) => () => {
		router.push('/' + id)
	}

	const enter = () => setMinimal(false)
	const leave = () => setMinimal(true)

	return (
		<div className={styles.playlists} onMouseEnter={enter} onMouseLeave={leave}>
			{ playlists.map( pl => 
				<Playlist 
					{...pl} 
					isMinimal={minimal}	
					setPlaylistId={setPlaylistId} 
					key={`playlist${Math.random()}`} />
			) } 
		</div>
	)
}

export default Playlists;