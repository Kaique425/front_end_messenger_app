import { useEffect } from "react"

export const TemplatePreview = ({templateData}) => {
    useEffect( () => {

    }, [templateData])

    return (
        <div className="HSM-container">
            <div className="HSM-message">
                <div className="HSM-header">{templateData?.header}</div>
                <div className="HSM-body">{templateData?.body}</div>
                <div className="HSM-footer">{templateData?.footer}</div>
                <div className="HSM-buttons">
                    {templateData?.buttons?.map(buttonItem => (
                        <button key={buttonItem.id} >{buttonItem.body}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}