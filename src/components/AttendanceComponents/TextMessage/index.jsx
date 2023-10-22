import "./style.css"

export const TextMessage = ({date, textMessage, isCaption, context}) => {


    return (
        <>
            {isCaption?(
            <div className="caption-container">
                <div>
                    <p className="message-text">{textMessage}</p>
                </div>
            </div>
        ):textMessage?(

            <div className="text-div-message">
                <p className="message-text">{textMessage}</p>
                <span className="text-space" ></span><span className="message-fitter" ></span>
            </div>

        ):(
            <div></div>
        )
        }
        </>
        
    )
}