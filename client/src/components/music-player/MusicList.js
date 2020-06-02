import React, { useEffect } from "react";
import axios from 'axios'
import Settings from "../../Settings.json"

const MusicList = ({ musicList, handleTitleClick, handlePlay, handlePause, isPlaying, src, authUser, favoriteMusic, setFavoriteMusic, currentPlaylist, myMusic, setCurrentPlaylist }) => {
    const handleAddToFavorite = (file, title, artist) => {
        axios.post(Settings.server + 'music/add', { authUser, file, title, artist })
            .then(res => {
                //console.log("added to favorite!")
                let newFavorite = [...favoriteMusic, title]
                setFavoriteMusic(newFavorite)
            })
            .catch(err => console.log(err));
    }
    const handleRemoveFromFavorite = (title) => {
        let newFavorite = favoriteMusic.filter(item => item !== title)
        axios.post(Settings.server + 'music/delete', { title, authUser })
            .then(res => {
                setFavoriteMusic(newFavorite)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        let temp = []
        favoriteMusic.map((title) => {
            let temp2 = musicList.music.filter(music => music.title === title)
            temp = [...temp, temp2[0]]
        })
        if (myMusic) {
            setCurrentPlaylist(temp)
        }
    }, [myMusic, favoriteMusic])
    return (
        <div className="music-container">
            <div className="top-view">
                <div className="title">Title</div>
                <div className="author">Artist</div>
                <div className="time-clock">
                    <i className="far fa-clock fa-lg"></i>
                </div>
            </div>
            {currentPlaylist.map(({ file, title, artist, duration, rawDuration }, key) => (
                src === Settings.server + 'music/' + file ?
                    <div className="middle-view-selected" key={key}>
                        <div className="title" onClick={() => { handleTitleClick(file, key, duration, rawDuration) }}>{title}</div>
                        <div className="author">{artist}</div>
                        <div className="time">{duration}</div>
                        {!favoriteMusic.includes(title) ?
                            <i className="far fa-heart fa-lg  heart" onClick={() => { handleAddToFavorite(file, title, artist) }}></i> :
                            <i className="fas fa-ban fa-lg  heart" onClick={() => { handleRemoveFromFavorite(title) }}></i>
                        }
                        {!((src === Settings.server + 'music/' + file) && (isPlaying.playing)) ?
                            <i onClick={() => { handlePlay(file, key, duration, rawDuration) }} className="far fa-play-circle fa-2x play-button-list"></i> :
                            <i onClick={() => { handlePause() }} className="far fa-pause-circle fa-2x play-button-list" ></i>
                        }
                    </div> :
                    <div className="middle-view" key={key}>
                        <div className="title" onClick={() => { handleTitleClick(file, key, duration, rawDuration) }}>{title}</div>
                        <div className="author">{artist}</div>
                        <div className="time">{duration}</div>
                        {!favoriteMusic.includes(title) ?
                            <i className="far fa-heart fa-lg heart" onClick={() => { handleAddToFavorite(file, title, artist) }}></i> :
                            <i className="fas fa-ban fa-lg  heart" onClick={() => { handleRemoveFromFavorite(title) }}></i>
                        }
                        {!((src === Settings.server + 'music/' + file) && (isPlaying.playing)) ?
                            <i onClick={() => { handlePlay(file, key, duration, rawDuration) }} className="far fa-play-circle fa-2x play-button-list" ></i> :
                            <i onClick={() => { handlePause() }} className="far fa-pause-circle fa-2x play-button-list"></i>
                        }
                    </div>
            ))
            }
        </div>
    )
}

export default MusicList;

