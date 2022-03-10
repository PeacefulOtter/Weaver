import spotify from "../spotify";

    
const musics = [
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
    { img: "", title: "Passionfruit", author: "Drake", album: "More Life", date: "22 days ago", duration: "4:59" },
]

export default async function handler(req: any, res: any) {
    const { id } = req.query
    console.log('Requesting playlist ', id);
    const playlist = await spotify.playlist(req, id)
    console.log(playlist);
    res.status(200).json(playlist)
}