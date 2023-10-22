import "./style.css"
import { TextMessage } from "../TextMessage"
import { useEffect } from "react"

export const ImageMessage = ({imageSource, date, caption}) => {
    useEffect(() => {

    }, [imageSource])
    return (
            <>
                <img  className="image-message" src={imageSource} type="" />
                <TextMessage isCaption={true} textMessage={caption} date={date}/>
            </>
        )
        
    
    
}