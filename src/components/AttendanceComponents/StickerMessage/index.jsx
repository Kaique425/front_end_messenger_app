import "./style.css"
import { TextMessage } from "../TextMessage"

export const StickerMessage = ({imageSource, date}) => {

    return (
            <div className="sticker-container">
                <img  className="sticker-img" src={imageSource} type="" />
                <div className="sticker-date">{date}</div>
            </div>
        )
        
    
    
}