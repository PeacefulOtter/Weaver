
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";

import Playback from "../components/playback/Playback";
import Playlists from "../components/playlists/Playlists";

import { SpotifyProvider } from "../context/SpotifyContext";

import '../css/App.css';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {

	const router = useRouter()

	return (
		<SessionProvider session={session}>
			<SpotifyProvider>
				{router.pathname === "/login" ? (
					<Component {...pageProps} />
				) : (
					<div style={{display: 'flex'}}>
						<Playlists />
						<Component {...pageProps} />
						<Playback />
					</div>
				)}
			</SpotifyProvider>
		</SessionProvider>
	)
}

