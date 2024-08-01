import { BASE_URL } from "../../data/constants"
import { useState, useEffect, useRef } from "react"
import "./style.css"
import { KeyTemplateIcon } from "../../components/AttendanceComponents/Icons/KeyTemplateIcon"
import { MarketingTemplateIcon } from "../../components/AttendanceComponents/Icons/MarketingTemplateIcon"
import { MessageNotificationBell } from "../../components/AttendanceComponents/Icons/MesssageNotificationBell"
import { TemplatePreview } from "../../components/TemplatePreview"
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

                <div className="template-creation-container" >
                    <div className="template-creation-inputs" >
                       <div>
                            <h3 >Conteúdo</h3>
                            <span className="template-content-desc" >Preencha as seções de cabeçalho, corpo e rodapé do seu modelo.</span>
                       </div>
                        <div className="template-div template-name-div" >
                            <label htmlFor="template-div-title" className="template-div-title" ><strong>Nome do Modelo:</strong></label>
                            <div>
                                <input type="text" name="template-div-title" />
                                <span className="character-limit-span" >Limite de caracteres: 512</span>
                            </div>
                        </div>
                        <div className="template-div template-header-div" >
                            <label className="template-div-title" ><strong>Cabeçalho:</strong><span className="template-optional-desc" >Opcional</span></label>
                            <div>
                                <input type="text" />
                                <span className="character-limit-span" >Limite de caracteres: 60</span>
                            </div>
                            <button className="template-add-varible-button" >+ Adicionar variável</button>
                        </div>

                        <div className="template-div template-body-div" >
                            <label className="template-div-title" ><strong>Corpo:</strong></label>
                            <div>
                                <textarea className="body-textarea" type="text" maxLength={"1024"} rows="4" cols="20"/>
                                <span className="character-limit-span" >Limite de caracteres: 1024</span>
                            </div>
                            <button className="template-add-varible-button" >+ Adicionar variável</button>
                        </div>

                        <div className="template-div template-footer-div" >
                            <label className="template-div-title" ><strong>Rodapé:</strong><span className="template-optional-desc" >Opcional</span></label>
                            <div>
                                <input type="text" />
                                <span className="character-limit-span" >Limite de caracteres: 60</span>
                            </div>
                        </div>

                        <div className="template-div template-button-div" >
                            <label className="template-div-title" ><strong>Botões:</strong></label>
                            <div>
                                <span className="template-optional-desc" >
                                    Crie botões que permitam que os clientes respondam à sua mensagem ou realizem uma ação. É possível adicionar até 10 botões. Se você adicionar mais de 3 botões, eles aparecerão em uma lista.
                                </span>
                                <button>TESTE</button>
                            </div>
                        </div>
                    </div>
                    <div className="template-creation-preview" >
                        <div className="template-div-title" ><strong>Preview do Modelo:</strong></div>
                        <TemplatePreview/>
                    </div>

                </div>

                <button className="create-template-button" >Enviar para Análise.</button>
                <button onClick={() => handleCloseModal()} >Cancelar</button>
            </dialog>

            <table className="hsm-table">
                <caption className="table-caption">
                    Templates ordenados por status
                </caption>

                <thead>
                    <tr className="hsm-table-header">
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Linguagem</th>
                    </tr>
                </thead>
                { hsms && hsms.map( hsm => (
                    <tbody key={hsm.id} >
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
                    </tbody>
                ))}
            </table>

        </div>
    )
}


export default Templates