import "./style.css"
import { useState } from "react"
import { SendHSMPopUp } from "../../SendHSMPopUp"
import { useGlobalContext } from "../../../Contexts/GlobalContext"

export const CardHeader = ({AttendanceInfo, handleAttendanceClose}) => {
    const sectors = useGlobalContext()
    const [attendanceWasChanged, setAttendanceWasChange ] = useState(false)
    const footerMessageInput = document.querySelector("#footer-container")
    
    const handleClassificatinStatusUpdate = async (e) => {

        return console.log(e.target.value)
    }

    const handleSectorUpdate = async (e) => {

        const sectorId = e.target.value
        const response = await fetch(`http://localhost:8000/attendances/${AttendanceInfo.id}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                sector:sectorId
            })
        })

        const data = await response.json()

        console.log(data, response.status)
        footerMessageInput.style.display = "none"
        setAttendanceWasChange(true)
    }

    const handleOperatorAssignedUpdate = async () => {
        
    }

    const [showHSMPopUp, setShowHSMPopUp] = useState(false) 
    return (
            <div className="card-header">
                <div className="contact-info">
                    <div className="contact-details">
                        <div>Número do contato: {AttendanceInfo.customer_phone_number}</div>
                        <div>Nome: {AttendanceInfo.customer_name}</div>
                    </div>
                    {attendanceWasChanged?(
                        <div className="read-mode-info">Modo de somente Leitura ativo!</div>
                    ):
                    <button className="send-hsm-button" onClick={() => setShowHSMPopUp(true)}>Send HSM</button>


                    }
                    {showHSMPopUp &&
                        <SendHSMPopUp AttendanceInfo={AttendanceInfo} setShowHSMPopUp={setShowHSMPopUp} />
                    }
                    <div onClick={() => handleAttendanceClose()}>
                        <svg className="attendance-closeIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                        </svg>
                    </div>
                </div>
                {attendanceWasChanged?(
                    <div className="read-mode-description" >O responsável ou o setor foram alterados assim ativando o modo de somente leitura. (<strong>Caso deseje interagir é somente abrir novamente o atendimento</strong>)</div>
                ):
                <div className="attendance-change-options" >
                    <select name="" id="">
                        <option value="">Selecione um status</option>
                    </select>
                    <select name="" id="">
                        <option value="">Selecione um responsável</option>
                    </select>
                    <select name="" id="" value={AttendanceInfo.sector} onChange={(e) => handleSectorUpdate(e)}>
                        {sectors.map(sector => (
                        
                            <option key={sector.id}  value={sector.id} >{sector.name}</option>

                        ))}
                    </select>
                </div>
                
                }
            </div>
    )
}