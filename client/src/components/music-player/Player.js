import React, { useRef, useEffect, useState } from "react";
import Settings from "../../Settings.json"

const Player = ({ isPlaying, handlePlay, handlePause, player, src, setSrc, duration, currentTime, musicList, currentId, setCurrentId, setDuration, setIsPlaying, myMusic, repeat, setRepeat, random, setRandom, currentArtistPlaylist, currentArtist }) => {
    const progress = useRef(null)
    const progressBar = useRef(null)
    const [time, setTime] = useState('')
    const [volume, setVolume] = useState(30)
    const [currentSong, setCurrentSong] = useState({ title: '', artist: '' })
    useEffect(() => {
        if (currentTime !== undefined) {
            let minutes = Math.floor(currentTime / 60);
            let seconds = Math.floor(currentTime - minutes * 60);
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            if (minutes < 10) {
                minutes = '0' + minutes
            }
            setTime(minutes + ':' + seconds)
        }
        if (duration.rawDuration === '') {
            setTime('')
        }

    })
    useEffect(() => {
        if (localStorage.getItem('volume') === null) {
            setVolume(30)
            player.current.volume = 0.3
        }
        else {
            setVolume(localStorage.getItem('volume') * 100)
            player.current.volume = localStorage.getItem('volume')
        }
    }, [])
    useEffect(() => {
        if (currentId !== undefined)
            setCurrentSong({ title: musicList[currentId].title, artist: musicList[currentId].artist })

    }, [currentId])
    const handleProgressBar = (e) => {
        let x = (e.pageX - progressBar.current.getBoundingClientRect().left) / 4
        let newTime = x * duration.rawDuration / 100
        player.current.currentTime = newTime
    }
    const handleLeftButton = () => {
        if ((currentId > 0 && currentArtist === currentArtistPlaylist) || (currentId > 0 && myMusic && currentArtist === currentArtistPlaylist)) {
            setSrc(Settings.server + "music/" + musicList[currentId - 1].file)
            setCurrentId(currentId - 1)
            setDuration({ duration: musicList[currentId - 1].duration, rawDuration: musicList[currentId - 1].rawDuration })
            setIsPlaying({ playing: true })
        }
    }
    const handleRightButton = () => {
        let id = currentId
        if (musicList.length > 1) {
            if (random) {
                while (id === currentId) {
                    id = Math.floor(Math.random() * (musicList.length))
                }
                if ((currentArtist === currentArtistPlaylist) || (myMusic && currentArtist === currentArtistPlaylist)) {
                    setSrc(Settings.server + "music/" + musicList[id].file)
                    setCurrentId(id)
                    setDuration({ duration: musicList[id].duration, rawDuration: musicList[id].rawDuration })
                    setIsPlaying({ playing: true })
                }
            }
            else if ((id < musicList.length - 1 && currentArtist === currentArtistPlaylist) || (id < musicList.length - 1 && myMusic && currentArtist === currentArtistPlaylist)) {
                setSrc(Settings.server + "music/" + musicList[id + 1].file)
                setCurrentId(id + 1)
                setDuration({ duration: musicList[id + 1].duration, rawDuration: musicList[id + 1].rawDuration })
                setIsPlaying({ playing: true })
            }
        }
    }
    const handleVolume = (e) => {
        setVolume(e.target.value)
        player.current.volume = e.target.value / 100
        localStorage.setItem('volume', e.target.value / 100)

    }
    const handleRepeat = () => {
        setRepeat(!repeat)
        setRandom(false)
    }
    const handleRandom = () => {
        setRepeat(false)
        setRandom(!random)
    }
    return (
        <footer className="py-4 text-white-50 player fixed-bottom">
            <div className="player-control-buttons">
                {repeat ?
                    <i className="fas fa-redo-alt repeat-button-on" onClick={() => { handleRepeat() }}></i>
                    :
                    <i className="fas fa-redo-alt repeat-button" onClick={() => { handleRepeat() }}></i>
                }
                <i className="fas fa-angle-double-left left-button fa-2x" onClick={() => { handleLeftButton() }}></i>
                {!isPlaying.playing ?

                    <i onClick={() => { handlePlay() }} className="far fa-play-circle fa-3x play-button"></i> :
                    <i onClick={() => { handlePause() }} className="far fa-pause-circle fa-3x play-button"></i>
                }
                <i className="fas fa-angle-double-right right-button fa-2x" onClick={() => { handleRightButton() }}></i>

                {random ?
                    <i className="fas fa-random random-button-on" onClick={() => { handleRandom() }}></i>
                    :
                    <i className="fas fa-random random-button" onClick={() => { handleRandom() }}></i>
                }
            </div>
            <div className="current-song">
                <a className="current-title">{currentSong.title}</a><br />
                <a className="current-artist">{currentSong.artist}</a>
            </div>
            <div className="volume-slider">
                <i className="fas fa-volume-up volume-icon fa-lg"></i>
                <input type="range" min="1" max="100" value={volume} className="slider" onChange={(e) => { handleVolume(e) }} />
            </div>
            <div className="progr-bar ">
                <div className="currentTime">
                    {time}
                </div>
                <div ref={progress} className="duration-bar" onClick={(e) => { handleProgressBar(e) }}>

                    <div ref={progressBar} style={{ width: currentTime / duration.rawDuration * 100 + '%' }} className="currentTime-bar" ></div>
                </div>
                <div className="duration">
                    {duration.duration}
                </div>
            </div>
        </footer>
    )
}

export default Player;

