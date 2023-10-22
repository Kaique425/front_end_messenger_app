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
                <button onClick={() => pauseAudio()} id="playButton" >Pause</button>:
                <button onClick={() => playAudio()} id="playButton" >Play</button>
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
            <div id="currentTime" >{(currentSongDuration / 60).toFixed(2)}</div>
            <div style={{"color":"white"}}>/</div>
            <div id="duration" >{songDuration.toFixed(2)}</div>
            <div className="audio-date">{date}</div>
        </div>
    )
}