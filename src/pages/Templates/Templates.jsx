import { BASE_URL } from "../../data/constants"
import { useState, useEffect, useRef } from "react"
import "./style.css"
import { KeyTemplateIcon } from "../../components/AttendanceComponents/Icons/KeyTemplateIcon"
import { MarketingTemplateIcon } from "../../components/AttendanceComponents/Icons/MarketingTemplateIcon"
import { MessageNotificationBell } from "../../components/AttendanceComponents/Icons/MesssageNotificationBell"
import { TemplatePreview } from "../../components/TemplatePreview"
import { cleanHeader } from "../../utils/templateFieldCleaners"

const Templates = () => {
    const [hsms, setHsms] = useState([])
    const [templateInfo, setTemplateInfo] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    const templateDialogRef = useRef()

    const templateBodyRef = useRef()
    const templateHeaderRef = useRef()

    const handleTemplateInfoChange = (e, type) => {
        if (type === "header"){
            let cleanedText = ""
            cleanedText = cleanHeader(e.target.value)
            e.target.value = cleanedText
        }
        let example_key_name = `${type}_text`
        setTemplateInfo(prevState =>({...prevState, 
        [type]: {
            "type":type,
            "text": e.target.value,
            "example":{
                ...prevState[type]?.example,
                [example_key_name]:[
                    "Kaique HARDCODED"
                ]
            }
        }
        }))
    }



    const AddTemplateVariable = ({elementRef, variableQuantityLimit}) => {
        const previousValue = elementRef.current.value
        
        const pattern = /{{\d+}}/g

        const patternOcurrences = previousValue.match(pattern) || []
    
        let nextNumber = `{{${patternOcurrences.length + 1}}}`

        if(!variableQuantityLimit){
    
            elementRef.current.value = previousValue + nextNumber
            return
        }

        if (variableQuantityLimit > patternOcurrences.length){

            elementRef.current.value = previousValue + nextNumber
        }

    }


    const handleOpenModal = () => {
        templateDialogRef.current.showModal()
    }

    const handleCloseModal = () => {
        templateDialogRef.current.close()
    }

    const getHsms = async () => {
        const response = await fetch(`${BASE_URL}/hsms`)
        const data = await response.json()
        setHsms(data)
    }

    useEffect( () => {
        console.log(JSON.stringify(templateInfo))
    }, [templateInfo])

    useEffect( () => {
        getHsms()
    }, [])

    return (
        <div className="hsms-container" >
            <h3 className="template-title-page" >Gerencie os seus Templates!!</h3>
            
            <div className="buttons-container" >
                <button className="create-template-button" onClick={() => handleOpenModal()} >Criar modelo.</button>
            </div>

            <dialog className="template-creation-dialog" ref={templateDialogRef} >
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
                                <KeyTemplateIcon /> Autenticação
                            </div>
                        </li>
                    </ul>
                </nav>

                <div className="template-creation-container" >
                    <div className="template-creation-inputs" >
                        <div className="template-div template-name-div" >
                            <label htmlFor="template-title-field" className="template-div-title" ><strong>Nome do Modelo</strong></label>
                            <div className="template-field-input" >
                                <input  type="text" id="template-title-field" maxLength={512} required={true}/>
                                <span className="character-limit-span" >Limite de caracteres 512</span>
                            </div>
                        </div>
                       <div>
                            <h3 >Conteúdo</h3>
                            <span className="template-content-desc" >Preencha as seções de cabeçalho, corpo e rodapé do seu modelo.</span>
                       </div>
                        <div className="template-main-inputs-div" >
                                <div className="template-header-div" >
                                    <label htmlFor="template-header-field" className="template-div-title" ><strong>Cabeçalho</strong><span className="template-optional-desc" >Opcional</span></label>
                                    <div className="template-field-input" >
                                        <input ref={templateHeaderRef} id="template-header-field" onChange={(e) => handleTemplateInfoChange(e, "header")} type="text" maxLength={60} />
                                        <span className="character-limit-span" >Limite de caracteres 60</span>
                                    </div>
                                    <button  onClick={() => AddTemplateVariable({elementRef: templateHeaderRef, variableQuantityLimit: 1})} className="template-add-variable-button" >+ Adicionar variável</button>
                                </div>

                                <div className="template-body-div" >
                                    <label htmlFor="template-body-field" className="template-div-title" ><strong>Corpo</strong></label>
                                    <div>
                                        <textarea ref={templateBodyRef}  onChange={(e) => handleTemplateInfoChange(e, "body")} 
                                            className="body-textarea" 
                                            type="text" 
                                            maxLength={"1024"} 
                                            rows="4" 
                                            cols="20"
                                            id="template-body-field"
                                            required={true}
                                        />
                                    </div>
                                    <button onClick={() => AddTemplateVariable({elementRef: templateBodyRef, variableQuantityLimit: null})} className="template-add-variable-button" >+ Adicionar variável</button>
                                    <span className="character-limit-span" >Limite de caracteres 1024</span>
                                </div>

                                <div className="template-footer-div" >
                                    <label htmlFor="template-footer-field" className="template-div-title" ><strong>Rodapé</strong><span className="template-optional-desc" >Opcional</span></label>
                                    <div className="template-field-input" >
                                        <input  id="template-footer-field" type="text" onChange={(e) => handleTemplateInfoChange(e, "footer")} maxLength={60} />
                                        <span className="character-limit-span" >Limite de caracteres 60</span>
                                    </div>
                                </div>
                        </div>

                        <div className="template-div template-button-div" >
                            <div className="template-div-title" ><strong>Botões</strong></div>
                            <div>
                                <span className="template-optional-desc" >
                                    Crie botões que permitam que os clientes respondam à sua mensagem ou realizem uma ação. É possível adicionar até 10 botões. Se você adicionar mais de 3 botões, eles aparecerão em uma lista.
                                </span>
                                <button>TESTE</button>
                            </div>
                        </div>
                    </div>
                    <div className="template-creation-preview" >
                        <div className="template-div-title" ><strong>Preview do Modelo</strong></div>
                        <div className="HSM-container">
                            <div className="HSM-message">
                                    <div className="HSM-header">{templateInfo?.header?.text}</div>
                                    <div className="HSM-body">{templateInfo?.body?.text}</div>
                                    <div className="HSM-footer">{templateInfo?.footer?.text}</div>
                                    <div className="HSM-buttons">
                                        {templateInfo?.buttons?.map(buttonItem => (
                                            <button key={buttonItem.id} >{buttonItem.body}</button>
                                        ))}
                                    </div>
                            </div>
                        </div>
                        <div className="modal-template-buttons-container" >
                            <button className="template-action-button cancel-button" onClick={() => handleCloseModal()} >Cancelar</button>
                            <button className="template-action-button create-button" >Enviar para Análise.</button>
                        </div>
                    </div>

                </div>
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