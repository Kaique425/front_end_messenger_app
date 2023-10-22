import "./style.css"
import { TextMessage } from "../TextMessage"
export const VideoMessage = ({videoSource, textMessage, date}) => {


    return (
        <div >  
            <video className="video-player" controls >
                <source src={videoSource} type="video/mp4"/>
            </video>
            <TextMessage isCaption={true} textMessage={textMessage} date={date}/>
        </div>
    )
}