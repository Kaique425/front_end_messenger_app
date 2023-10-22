import "./style.css"
import {useRef, useEffect} from "react"

export const ImagePopUp = ({file, showPopUpImage, setMessage, handleSendMessages}) => {
    const imgElement = useRef(null)
    useEffect( () => {
        const reader = new FileReader()
        reader.addEventListener("load", (e) => {
            const readerTarget = e.target
            imgElement.current.src = readerTarget.result 
        })
        if (file){
            reader.readAsDataURL(file)
        }

    }, [file, showPopUpImage])

    return (
        <div className="image-popup-container">
            <img className="popup-img" ref={imgElement} alt="" />
            <textarea placeholder="Type your message here." onKeyDown={(event) => handleSendMessages(event)} onChange={(e) => setMessage(e.target.value) } type="text" name="message"/>
        </div>
    )
}