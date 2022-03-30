import React, { useState, useEffect } from "react"
import axios from "axios"
import TwitchFavThumbnail from "./TwitchFavThumbnail"
import YoutubeFavThumbnail from "./YoutubeFavThumbnail"

function FavoritePage({ }) {
  const [favorites, setFavorites] = useState([])
  const [userID, setUserID] = useState(null)
  const [streamerData, setStreamerData] = useState([])
  // const [displayName, setDisplayName] = useState("")
  // const [streamerProfile, setStreamerProfile] = useState([])
  const [youtubeTitle, setYoutubeTitle] = useState("")
  const [channelTitle, setChannelTitle] = useState("")
  const [videoThumbnail, setVideoThumbnail] = useState("")

  const [ID, setID] = useState("")
  const [fav, setFav] = useState([])

  useEffect(async () => {
    const res1 = await axios.get("/favorites")
    setFavorites(res1.data)
    // once they get loaded
    // store the user ID or something unique to that user in localStorage <-- just the ID
    // whenever this component loads
    // send request the server/API for the user by that ID if localStorage has it in there
    // load favorites from that request's response INSTEAD of from the other place you got it

    const res2 = await axios.get("/me")
    setUserID(res2.data.id)

    localStorage.setItem("myFav", JSON.stringify(res1.data))
    const myFav = JSON.parse(localStorage.getItem("myFav"))
    localStorage.setItem("myId", res2.data.id)
    const myID = localStorage.getItem("myId")

    setID(myID)
    setFav(myFav)

    // const filteredFavorites = myFav.filter(favorite => favorite.user_id === parseInt(myId))
    // filteredFavorites.map(async favorite => {
    //   if (favorite.twitch_streamer && !favorite.video_id && !favorite.stream_id) {
    //     const res3 = await axios.get(`https://api.twitch.tv/helix/search/channels?query=${favorite.twitch_streamer}`, {
    //       headers: {
    //         Authorization: "Bearer 6gc86wnfd4e2z6wymi3rzgeczq0ppl",
    //         "Client-Id": "yj62jo4k7wcs8xjg6xder4torg8m41"
    //       }
    //     })
    //     setStreamerData([...streamerData, res3.data.data[0]])
    //   } else if (!favorite.twitch_streamer && favorite.video_id && !favorite.stream_id) {
    //     const res4 = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${favorite.video_id}&maxResults=1&key=AIzaSyD9bB2_2ejQSoDyBcT8_6U6jo7g1bMMMwo`)
    //     setYoutubeTitle(res4.data.items[0].snippet.localized.title)
    //     setChannelTitle(res4.data.items[0].snippet.channelTitle)
    //     setVideoThumbnail(res4.data.items[0].snippet.thumbnails.high.url)
    //   }
    //   // else {
    //   //   axios.get(`muxstream`)
    //   // }
    // })
  }, [])

  // console.log(ID, fav)

  const filteredFavorites = fav.filter(favorite => favorite.user_id === parseInt(ID))

  return (
    <>
      {/* {streamerData.map(stream => <TwitchFavThumbnail key={stream.id} displayName={stream.display_name} streamerProfile={stream.thumbnail_url} />)}
      <YoutubeFavThumbnail youtubeTitle={youtubeTitle} channelTitle={channelTitle} videoThumbnail={videoThumbnail} /> */}
      {filteredFavorites.map(favorite => <TwitchFavThumbnail key={favorite.id} favorite={favorite}/>)}
      {filteredFavorites.map(favorite => <YoutubeFavThumbnail key={favorite.id} favorite={favorite}/>)}
    </>
  )
}


export default FavoritePage