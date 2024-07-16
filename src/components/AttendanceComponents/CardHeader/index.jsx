import "./style.css"
import { useState } from "react"
import { SendHSMPopUp } from "../../SendHSMPopUp"
import { useGlobalContext } from "../../../Contexts/GlobalContext"
import { BASE_URL } from "../../../data/constants"
import { WhatsAppIcon } from "../Icons/WhatsAppIcon"
import { CloseWindowIcon } from "../Icons/CloseWindowIcon"
import { SendActiveIcon } from "../Icons/SendActiveIcon"

export const CardHeader = ({setMessages, AttendanceInfo, handleAttendanceClose}) => {
    const sectors = useGlobalContext()
    const [attendanceWasChanged, setAttendanceWasChange ] = useState(false)
    const footerMessageInput = document.querySelector("#footer-container")
    
    const handleClassificatinStatusUpdate = async (e) => {

        return console.log(e.target.value)
    }

    const handleFinishAttendance = async (attendanceId) => {
        const response = await fetch(`${BASE_URL}/attendances/${attendanceId}/finish/`, { method: "PATCH",})

        if(response.status === 200){
            console.log(response.status)
            handleAttendanceClose()
        }else{
            console.log(response.status)
        }
    }

    const handleSectorUpdate = async (e) => {

        const sectorId = e.target.value
        const response = await fetch(`${BASE_URL}/attendances/${AttendanceInfo.id}/`, {
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
                    <WhatsAppIcon/>
                    <div className="contact-details">
                        <div><strong>Nome:</strong> {AttendanceInfo.customer_name}</div>
                        <div><strong>Contato:</strong> {AttendanceInfo.customer_phone_number}</div>
                    </div>
                    {attendanceWasChanged?(
                        <div className="read-mode-info">Modo de somente Leitura ativo!</div>
                    ):
                    <div className="action-buttons-container">
                        <button className="send-hsm-button" onClick={() => setShowHSMPopUp(true)}>
                        Enviar Modelo
                        <SendActiveIcon/>
                        </button>
                        <button className="finish-attendance-button" onClick={() => handleFinishAttendance(AttendanceInfo.id)}>Finalizar</button>
                    </div>

                    }
                    {showHSMPopUp &&
                        <SendHSMPopUp AttendanceInfo={AttendanceInfo} setShowHSMPopUp={setShowHSMPopUp} isCreation={false} />
                    }
                    <div className="close-window-button" onClick={() => handleAttendanceClose()}>
                        <CloseWindowIcon/>
                    </div>
                </div>
                {attendanceWasChanged?(
                    <div className="read-mode-description" >O responsável ou o setor foram alterados assim ativando o modo de somente leitura. (<strong>Caso deseje interagir é somente abrir novamente o atendimento</strong>)</div>
                ):
                <div className="attendance-change-options-container" >
                    <div className="selection-items" >
                        <label htmlFor="classification-status">Status de Classificação:</label>
                        <select name="" id="classification-status">
                            <option value="">Selecione um status</option>
                        </select>
                    </div>
                    <div className="selection-items" >
                        <label htmlFor="responsible-transference">Selecione um responsável:</label>
                        <select name="" id="responsible-transference">
                            <option value="">Selecione um responsável</option>
                        </select>
                    </div>
                    <div className="selection-items" >
                        <label htmlFor="sector-transference">Selecione um setor:</label>
                        <select name="" id="sector-transference" value={AttendanceInfo.sector} onChange={(e) => handleSectorUpdate(e)}>
                            {sectors.map(sector => (
                            
                                <option key={sector.id}  value={sector.id} >{sector.name}</option>

                            ))}
                        </select>
                    </div>
                </div>
                }
            </div>
    )
}