import "./style.css"
import {useRef, useState, useEffect} from "react"
export const AudioMessage = ({audioSource, date}) => {
    const [songDuration, setSongDuration ] = useState(0)
    const [currentSongDuration, setCurrentSongDuration ] = useState(0)
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying ] = useState(false)
    const progressBarElement = useRef(null)

    
    const playAudio = async () => {
        audioRef.current.play()
        setIsPlaying(true)
    }

    const handleDurationTimeUpdate = () => {
        const value = audioRef.current.currentTime / audioRef.current.duration * 100
        progressBarElement.current.value = value
        setCurrentSongDuration(audioRef.current.currentTime) 
    }

    const pauseAudio = async () => {
        audioRef.current.pause()
        setIsPlaying(false)
    } 

    const handleOnAudioEnded = () => {
        progressBarElement.current.value = "0"
        setIsPlaying(previousState => !previousState)
        setCurrentSongDuration(0)
    }

    const handleOnLoadData = () => {
        progressBarElement.current.value = "0"
        console.log(`DURATION ${audioRef.current.duration}`)
        setSongDuration(audioRef.current.duration)
    }
    useEffect( () => {
        
    }, [])
    return (

        <div id="audio-player-container" >
            { isPlaying?
                <button className="audio-button payse-button" onClick={() => pauseAudio()} id="playButton" >
                <svg 
                    height="20px" 
                    id="Layer_1" 
                    style={{enablebackground:"new 0 0 512 512"}} 
                    version="1.1" 
                    viewBox="0 0 512 512"
                    width="20px" xml:space="preserve" 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g>
                        <path fill="white" d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z"/>
                        <path fill="white" d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z"/>
                        </g>
                    </svg>
                    </button>:
                <button className="audio-button play-button" onClick={() => playAudio()} id="playButton" >
                    <svg 
                    style={{enablebackground: "new 0 0 32 32" }}
                    height="18px" 
                    version="1.1" 
                    viewBox="0 0 32 32" 
                    width="18px" 
                    xmlSpace="preserve" 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="play"><g>
                    <path fill="white" d="M4.993,2.496C4.516,2.223,4,2.45,4,3v26c0,0.55,0.516,0.777,0.993,0.504l22.826-13.008    c0.478-0.273,0.446-0.719-0.031-0.992L4.993,2.496z"/><path fill="white" d="M4.585,30.62L4.585,30.62C3.681,30.62,3,29.923,3,29V3c0-0.923,0.681-1.62,1.585-1.62c0.309,0,0.621,0.085,0.904,0.248    l22.794,13.007c0.559,0.319,0.878,0.823,0.878,1.382c0,0.548-0.309,1.039-0.847,1.347L5.488,30.373    C5.206,30.534,4.894,30.62,4.585,30.62z M5,3.651v24.698l21.655-12.34L5,3.651z"/>
                    </g></g>
                
                    </svg>
                </button>
            }
            <audio 
            ref={audioRef} 
            src={audioSource} 
            onChange={(e) => setCurrentSongDuration(e.target.value)}
            onCanPlayThrough={() => handleOnLoadData()}
            onEnded={handleOnAudioEnded}
            onTimeUpdate={() => handleDurationTimeUpdate()}>
            
            </audio>
            <input  ref={progressBarElement} type="range" id="audio-progress-bar" min="0" max="100"></input>
            <div className="audio-timers">
                <div id="currentTime" >{(currentSongDuration / 60).toFixed(2)}</div>
                <div style={{"color":"white"}}>/</div>
                <div id="duration" >{songDuration.toFixed(2)}</div>
            </div>
            <div className="audio-date">{date}</div>
        </div>
    )
}