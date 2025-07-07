import React,{useContext, createContext, useState} from 'react'

const PlaylistContext = createContext()

export const usePlaylist = () => useContext(PlaylistContext)

export const PlaylistProvider = ({children}) => {
    const [playlist, setPlaylist] = useState(null);

    return(
        <PlaylistContext.Provider value={{playlist, setPlaylist}}>
            {children}
        </PlaylistContext.Provider>
    )
}
