import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner'

const Sidebar = ({ musicList, handleNewArtist, myMusic, setMyMusic, setCurrentArtistPlaylist, currentArtistPlaylist }) => {
    const [artists, setArtists] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        let temp = []
        musicList.music.map(({ artist }, key) => {
            temp = [...temp, artist]
            setArtists(temp)
            if (key === musicList.music.length - 1) {
                setLoaded(true)
            }
        })
    }, [musicList])

    const handleMyMusic = () => {
        setMyMusic(true)
        setCurrentArtistPlaylist("favorite")
    }
    return (

        <div className="sidebar">
            {!loaded ?
                <Spinner animation="grow" variant="success" className="spinner" />
                :
                <div>
                    <ul className="nav flex-column border-bottom border-secondary pb-3">
                        <li className="nav-item ">
                            {myMusic ?
                                < div className="my-music-button-selected" onClick={() => { handleMyMusic() }}>
                                    <i className="fas fa-bars fa-sm list-icon"></i>
                                    <a>My music</a>
                                </div> : < div className="my-music-button" onClick={() => { handleMyMusic() }}>
                                    <i className="fas fa-bars fa-sm list-icon"></i>
                                    <a>My music</a>
                                </div>
                            }
                        </li>
                    </ul>
                    <ul className="nav flex-column">
                        {[...new Set(artists)].map((artist, key) => (
                            currentArtistPlaylist === artist ?
                                <li className="nav-item artist-list-selected" key={key} onClick={() => { handleNewArtist(artist) }}>
                                    <a className="">{artist}</a>
                                </li> :
                                <li className="nav-item artist-list" key={key} onClick={() => { handleNewArtist(artist) }}>
                                    <a className="">{artist}</a>
                                </li>
                        ))
                        }
                    </ul>
                </div>
            }
        </div >
    )
}

export default Sidebar;

