import "./style.css"
import { useRef, useState, useEffect } from "react"
import { ImagePopUp } from "../ImagePopUp"
export const CardFooter = ({setContextMessageId, sendMessage }) => {
    const [showPopUpImage, setShowPopUpImage] = useState(false)
    let imageElement = useRef(null)
    let inputField = useRef(null)
    const textAreainput = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [message, setMessage] = useState("")
    const handleFileChange = () => {
        setShowPopUpImage(true)
        setSelectedFile(inputField.current.files[0])
    }

    const handleSendMessages = (event) => {

        if (event.key === "Enter") {
            setContextMessageId(null)
            event.preventDefault()
            sendMessage(selectedFile, message)
            setSelectedFile(null)
            setShowPopUpImage(false)
            inputField.current.value = ""
            event.target.value = ""
            textAreainput.current.value = ""
        }
    }

    useEffect(() => {
        if (showPopUpImage) {
            console.log(selectedFile)
        }

    }, [showPopUpImage])


    return (
        <div id="footer-container" className="footer-container">
                <div className="interactions-footer-container" >
                        {showPopUpImage &&
                            <ImagePopUp handleSendMessages={handleSendMessages} file={selectedFile} showPopUpImage={showPopUpImage} setMessage={setMessage} />
                        }
                        <label className="img-sender-input" htmlFor="sender_input">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" /></svg>
                            <input className="img-sender-input" accept=".jpg, .jpeg, .png" ref={inputField} id="sender_input" type="File" onChange={handleFileChange} />
                        </label>
                        <textarea id="textarea-message-input" className="textarea-message" 
                        ref={textAreainput} 
                        placeholder="Type your message here." 
                        onKeyDown={(event) => handleSendMessages(event)} 
                        onChange={(e) => setMessage(e.target.value)} 
                        type="text" name="message" />
                        <button onKeyDown={(event) => sendMessage(event, selectedFile)} >Send Message</button>
                </div>
        </div>
    )
}