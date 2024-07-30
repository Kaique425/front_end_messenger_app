import { BASE_URL } from "../../data/constants"
import { useState, useEffect, useRef } from "react"
import "./style.css"
import { KeyTemplateIcon } from "../../components/AttendanceComponents/Icons/KeyTemplateIcon"
import { MarketingTemplateIcon } from "../../components/AttendanceComponents/Icons/MarketingTemplateIcon"
import { MessageNotificationBell } from "../../components/AttendanceComponents/Icons/MesssageNotificationBell"
const Templates = () => {
    const [hsms, setHsms] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const templateModel = useRef()

    const handleOpenModal = () => {
        templateModel.current.showModal()

    }

    const handleCloseModal = () => {
        templateModel.current.close()

    }

    const getHsms = async () => {
        const response = await fetch(`${BASE_URL}/hsms`)
        const data = await response.json()
        setHsms(data)
    }

    useEffect( () => {
        getHsms()
    }, [])

    return (
        <div className="hsms-container" >
            <h3 className="template-title-page" >Gerencie os seus Templates!!</h3>
            
            <div className="buttons-container" >
                <button className="create-template-button" onClick={() => handleOpenModal()} >Criar modelo.</button>
            </div>

            <dialog className="template-creation-dialog" ref={templateModel} >
                <nav className="nav-template-types" >
                    <ul>
                        <li className="nav-type-item" >
                            <div className="type-item-content" >
                            <MarketingTemplateIcon/> Marketing
                            </div>
                        </li>
                        <li className="nav-type-item" >
                            <div className="type-item-content" >
                                <MessageNotificationBell/> Utilidade
                            </div>
                        </li>
                        <li className="nav-type-item" >
                            <div className="type-item-content" >
                                <KeyTemplateIcon/> Autenticação
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="template-header-div" >

                </div>

                <div className="template-body-div" >

                </div>

                <div className="template-footer-div" >

                </div>

                <button className="create-template-button" >Enviar para Análise.</button>
                <button onClick={() => handleCloseModal()} >Cancelar</button>
            </dialog>

            <table className="hsm-table">
                <caption className="table-caption">
                    Templates ordenados por status
                </caption>

                <tr className="hsm-table-header">
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Status</th>
                    <th>Linguagem</th>
                </tr>
                { hsms && hsms.map( hsm => (
                    <tr>
                        <td data-cell="name" className="hsm-field-item" >{hsm.name}</td>
                        <td data-cell="category" className="hsm-field-item category-item " >{hsm.category}</td>
                        <td data-cel="status" className="hsm-field-item" >
                            {  hsm.status === "pending"? (
                                <div className="status pending-status-div" >Pendente</div>

                            ): hsm.status === "approved"?(
                                <div className="status approved-status-div" >Aprovado</div>

                            ): hsm.status === "rejected"?(
                                <div className="status rejected-status-div" >Rejeitado</div>

                            ): hsm.status === "disabled" || hsm.status === "paused"?(
                                <div className="status disabled-status-div" >Desabilitado</div>
                            ):(
                                <div className="status" >{hsm.status}</div>
                            )

                            }
                        </td>
                        <td data-cell="language" className="hsm-field-item" >{hsm.language_code}</td>
                    </tr>
                ))}
            </table>

        </div>
    )
}


export default Templates