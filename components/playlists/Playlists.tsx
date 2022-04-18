
import { useRouter } from 'next/router';
import { FiHome } from 'react-icons/fi'
import { useSpotify } from '../../context/SpotifyContext';

import styles from './Playlists.module.css' 
import 'bootstrap/dist/css/bootstrap.min.css';

const PlaylistElt = ( { isActive, onClick, emoji, nameEmoji } ) => {
	
	const style = styles.playlistwrapper + ' ' 
		+ (isActive ? styles.playlistActiveWrapper : '') + ' '

	return (
		<div className={style} onClick={onClick}>
			<div className={styles.playlistEmoji}>{emoji}</div>
			<div className={styles.playlistName}>{nameEmoji}</div>
		</div>
	)
}


const Playlist = ( { isActive, name, onClick } ) => {

	const emoji = name.match(/\p{Emoji}+/gu)[0].replace('2022', '🎵').replace('2021', '🎵')
	const nameEmoji = name.replace(emoji, '')

	return <PlaylistElt isActive={isActive} onClick={onClick} emoji={emoji} nameEmoji={nameEmoji} />
}

const Playlists = () => {

	const { playlists } = useSpotify()	

	const router = useRouter()
	const { playlistID } = router.query

	const setPlaylistId = (id: string) => () => {
		router.push('/' + id)
	}

	return (
		<div className={styles.playlists} >
			<PlaylistElt 
				isActive={playlistID === undefined} 
				onClick={setPlaylistId('')} 
				emoji={<FiHome />} 
				nameEmoji="Home" 
			/>
			{ playlists.map( pl => 
				<Playlist 
					{...pl} 
					isActive={pl.id === playlistID}
					onClick={setPlaylistId(pl.id)} 
					key={`playlist${Math.random()}`} />
			) } 
		</div>
	)
}

export default Playlists;