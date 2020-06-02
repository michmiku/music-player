import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthenticatedUser } from "../../contexts/AuthenticatedUser.js"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Player from "./Player.js";
import Sidebar from "./Sidebar.js";
import MusicList from "./MusicList.js";
import Settings from "../../Settings.json"

const Music = () => {
    const [musicList, setMusicList] = useState({ music: [] })
    const [src, setSrc] = useState('')
    const [isPlaying, setIsPlaying] = useState({ playing: false })
    const [duration, setDuration] = useState({ duration: '', rawDuration: '' })
    const [currentTime, setCurrentTime] = useState()
    const [currentId, setCurrentId] = useState()
    const [currentPlaylist, setCurrentPlaylist] = useState([])
    const [favoriteMusic, setFavoriteMusic] = useState([])
    const [myMusic, setMyMusic] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [random, setRandom] = useState(false)
    const [currentArtistPlaylist, setCurrentArtistPlaylist] = useState()
    const [currentArtist, setCurrentArtist] = useState()

    const { authUser } = useContext(AuthenticatedUser)

    const player = useRef(null)

    useEffect(() => {
        axios.get(Settings.server + 'music/getlist')
            .then(res => {
                setMusicList({ music: res.data })
            })
            .catch(err => console.log(err));
        axios.post(Settings.server + 'music/favorite', authUser)
            .then(res => {
                let temp = []
                res.data.map(({ title }) => {
                    temp = [...temp, title]
                    setFavoriteMusic(temp)
                })
            })
            .catch(err => console.log(err));
    }, [])
    useEffect(() => {
        if (src !== '') {
            player.current.load()
            player.current.play()
        }
    }, [src])

    const handleTitleClick = (file, key, duration, rawDuration) => {
        setSrc(Settings.server + 'music/' + file)
        setIsPlaying({ playing: true })
        setCurrentId(key)
        player.current.load()
        player.current.play()
        setDuration({ duration: duration, rawDuration: rawDuration })
        setCurrentArtist(currentArtistPlaylist)
    }
    const handlePlay = (file, key, duration, rawDuration) => {
        if (src === '' && file === undefined) { }
        else if ((src === Settings.server + 'music/' + file) || file === undefined) {
            setIsPlaying({ playing: true })
            player.current.play()
        }
        else {
            setSrc(Settings.server + 'music/' + file)
            setIsPlaying({ playing: true })
            setCurrentId(key)
            setDuration({ duration: duration, rawDuration: rawDuration })
            setCurrentArtist(currentArtistPlaylist)
        }
    }
    const handlePause = () => {
        setIsPlaying({ playing: false })
        player.current.pause()
    }
    const handleProgress = () => {
        setCurrentTime(player.current.currentTime)
    }
    const handleEnd = (e) => {
        let id = currentId
        if (currentPlaylist.length < 2 && !random && !repeat) {
            setCurrentTime(0)
            setSrc('')
            setCurrentId(null)
            setDuration({ duration: '', rawDuration: 0 })
            setIsPlaying({ playing: false })
            player.current.load()
            player.current.play()
        }
        else if (random) {
            if (currentPlaylist.length < 2) {
                setCurrentTime(0)
                player.current.load()
                player.current.play()
            }
            else {
                while (id === currentId) {
                    id = Math.floor(Math.random() * (currentPlaylist.length))
                }

                if ((currentArtist === currentArtistPlaylist) || (myMusic && currentArtist === currentArtistPlaylist)) {
                    setSrc(Settings.server + 'music/' + currentPlaylist[id].file)
                    setCurrentId(id)
                    setDuration({ duration: currentPlaylist[id].duration, rawDuration: currentPlaylist[id].rawDuration })
                    setIsPlaying({ playing: true })
                }
            }
        }
        else if (repeat) {
            setCurrentTime(0)
            player.current.load()
            player.current.play()
        }
        else if ((id < currentPlaylist.length - 1 && currentArtist === currentArtistPlaylist) || (id < currentPlaylist.length - 1 && myMusic && currentArtist === currentArtistPlaylist)) {
            setSrc(Settings.server + 'music/' + currentPlaylist[id + 1].file)
            setCurrentId(id + 1)
            setDuration({ duration: currentPlaylist[id + 1].duration, rawDuration: currentPlaylist[id + 1].rawDuration })
            setIsPlaying({ playing: true })
        }
    }
    const handleNewArtist = (artist) => {
        let temp = musicList.music.filter(song => song.artist === artist)
        setCurrentPlaylist(temp)
        setMyMusic(false)
        setCurrentArtistPlaylist(artist)
    }
    return (
        authUser.username !== '' && authUser.username !== 'null' && authUser.username !== null ?
            <div className="box">
                <Sidebar musicList={musicList} handleNewArtist={handleNewArtist} myMusic={myMusic} setMyMusic={setMyMusic} setCurrentArtistPlaylist={setCurrentArtistPlaylist} currentArtistPlaylist={currentArtistPlaylist} />
                <MusicList musicList={musicList} handleTitleClick={handleTitleClick} handlePlay={handlePlay} handlePause={handlePause} isPlaying={isPlaying} src={src} authUser={authUser} favoriteMusic={favoriteMusic} setFavoriteMusic={setFavoriteMusic} currentPlaylist={currentPlaylist} myMusic={myMusic} setCurrentPlaylist={setCurrentPlaylist} />
                <Player isPlaying={isPlaying} handlePlay={() => { handlePlay() }} handlePause={() => { handlePause() }} player={player} src={src} setSrc={setSrc} duration={duration} currentTime={currentTime} musicList={currentPlaylist} currentId={currentId} setCurrentId={setCurrentId} setDuration={setDuration} setIsPlaying={setIsPlaying} myMusic={myMusic} repeat={repeat} setRepeat={setRepeat} random={random} setRandom={setRandom} currentArtistPlaylist={currentArtistPlaylist} currentArtist={currentArtist} />
                <audio ref={player} onTimeUpdate={() => handleProgress()} onEnded={() => { handleEnd() }}>
                    <source src={src} />
                </audio>
            </div>
            :
            <div style={{ width: '100vw', height: 'calc(100vh - 49px)', backgroundColor: '#d6d6d6' }}>
                <div className="card-body" style={{ backgroundColor: '#d6d6d6', color: '#5a5a5a' }}>
                    <h1 className="card-title">You are not logged in!</h1>
                    <h3 className="card-text">In order to browse and listen to music you need to either login to your account or create a new one.</h3>
                    <Link to="/login" className="btn btn-dark mr-5 btn-lg">Login</Link>
                    <Link to="/register" className="btn btn-dark btn-lg">Register</Link>
                </div>
            </div>
    )
}

export default Music;

