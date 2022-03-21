
import axios from "axios";
import {
	createContext,
	useContext,
	useState,
} from "react";
import spotify from "../pages/api/spotify";

interface ContextProps {
	playlists: any[];
	fetchPlaylists: () => Promise<void>;
	currentTrackID: string | undefined;
	playTrack: (id: string) => () => void;
}

const SpotifyContext = createContext({} as ContextProps);

const get = async (path: string, cb?: (data: any) => void, options?: object) => {
	try {
		const resp = await axios.get(path, { params: options } );
		if ( cb ) cb(resp.data);
	} catch (err) {
		console.log(err);
	}
}

export const SpotifyProvider = ({ children }: any) => {

  	const [playlists, setPlaylists] = useState<any[]>([]);
	const [currentTrackID, setCurrentTrackID] = useState<string | undefined>(undefined)

  	const fetchPlaylists = async () => {
		await get('/api/playlists', (data: any) => {
			console.log(data);
			setPlaylists(data.items)
		})
  	};

	const playTrack = (id: string) => () => {
		console.log(id);
		get('/api/play', (data: any) => setCurrentTrackID(id), { id })
	}

	return (
		<SpotifyContext.Provider
			value={{
				playlists,
				fetchPlaylists,
				currentTrackID,
				playTrack
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export const useSpotify = () => useContext(SpotifyContext);