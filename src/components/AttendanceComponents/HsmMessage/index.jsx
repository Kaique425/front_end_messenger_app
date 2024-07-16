import "./style.css"

export const HsmMessage = ({message}) => {

    return (
        <div>
            <div className="hsm-header" ><strong>{message.hsm_header}</strong></div>
            <div className="hsm-body" >{message.body}</div>
            <div className="hsm-footer" >{message.hsm_footer}</div>
            {message.hsm_buttons?.map( (button, index) => (
                <button className="hsm-buttons" key={index} >{button}</button>
            ))}
        </div>
    )
}