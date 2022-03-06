import { useEffect } from "react";
import { get } from "../../assets/requests";

const Menu = () => {

	useEffect( () => {
		get('/api/spotify/login', {}, (data) => {
			window.location.href = data.url;
		})
	}, [])

	return (
		<div>
		</div>
	)
}

export default Menu;