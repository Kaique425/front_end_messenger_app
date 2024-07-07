import "./style.css"
import { useRef, useState, useEffect } from "react"
import { ImagePopUp } from "../ImagePopUp"
import { MicrofoneIcon } from "../Icons/MicrofoneIcon"
import { ImageSenderIcon } from "../Icons/ImageSenderIcon"
export const CardFooter = ({setContextMessageId, sendMessage }) => {
    const [showPopUpImage, setShowPopUpImage] = useState(false)
    const [height, setHeight] = useState(100)
    const [previousHeight, setPreviousHeight]  = useState()
    const [message, setMessage] = useState("")
    
    const initialHeightRef = useRef(height)
    let inputField = useRef(null)
    let footerContainerRef = useRef(null)
    const textAreaRef = useRef(null)

    const [selectedFile, setSelectedFile] = useState(null)


    const handleFileChange = () => {
        setShowPopUpImage(true)
        setSelectedFile(inputField.current.files[0])
    }

    const handleHeightIncreaseOnDrag = (e) => {
        e.preventDefault();

        const startY = e.clientY;
        const initialHeight = footerContainerRef.current.offsetHeight;
        initialHeightRef.current = initialHeight;

        const onMouseMove = (e) => {
            const deltaY = startY - e.clientY;
            const newHeight = initialHeight + deltaY;
            if (newHeight > 50) {
                setHeight(newHeight);
                footerContainerRef.current.style.height = `${newHeight}px`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };
    

    const handleKeyDownEvents = (event) => {

        if (event.key === "Enter" && !event.shiftKey){
            console.log(event.key)
            setContextMessageId(null)
            event.preventDefault()
            sendMessage(selectedFile, message)
            setSelectedFile(null)
            setShowPopUpImage(false)
            inputField.current.value = ""
            event.target.value = ""
            textAreaRef.current.value = ""
        }

        if(event.ctrlKey && event.key === "b"){
            event.preventDefault()
            const start = textAreaRef.current.selectionStart
            const end = textAreaRef.current.selectionEnd
            const fullText = textAreaRef.current.value

            const selectedText = fullText.substring(start, end)

            const newFormattedText = `${fullText.substring(0, start)}*${selectedText}*${fullText.substring(end)}`
            setMessage(newFormattedText)
            textAreaRef.current.value = newFormattedText
            console.log(`${start} X ${end} Text ${selectedText}`)
    }
    }

    useEffect(() => {
        footerContainerRef.current.style.height = `${height}px`;
    }, [height]);


    return (
        <div id="footer-container" className="footer-container" style={{ height: `${height}px` }} ref={footerContainerRef}>
                <div className="interaction-resize-container">
                    <div className="expand-input-arrow"  onMouseDown={ (e) => handleHeightIncreaseOnDrag(e)} ></div>
                    <div className="interactions-footer-container" >
                            {showPopUpImage &&
                                <ImagePopUp handleSendMessages={handleKeyDownEvents} file={selectedFile} showPopUpImage={showPopUpImage} setMessage={setMessage} />
                            }
                            <label className="img-sender-input" htmlFor="sender_input">
                                <ImageSenderIcon/>
                                <input className="img-sender-input" accept=".jpg, .jpeg, .png" ref={inputField} id="sender_input" type="File" onChange={handleFileChange} />
                            </label>

                            <textarea id="textarea-message-input" className="textarea-message" 
                            ref={textAreaRef} 
                            placeholder="Escreva uma mensagem." 
                            onKeyDown={(event) => handleKeyDownEvents(event)} 
                            onChange={(e) => setMessage(e.target.value)} 
                            type="text" 
                            name="message" 
                            maxLength="4096"
                            />
                            <div className="microfone-input">
                                <MicrofoneIcon/>
                            </div>
                    </div>
                </div>
        </div>
    )
}