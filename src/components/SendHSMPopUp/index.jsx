import "./style.css"
import { useState, useEffect } from "react"
import { sendWhatsAppHSMMessage } from "../../whatsapp_functions"
import { BASE_URL } from "../../constants"
import { insertMaskInPhone } from "../../../modules/phoneMask"
export const SendHSMPopUp = ({setShowHSMPopUp, AttendanceInfo, isCreation}) => {
    const [availableHSM, setAvailableHSM]  = useState([])
    const [phoneNumber, setPhoneNumber] = useState()
    const [phoneDDD, setPhoneDDD] = useState()
    const [currentHSMSelected, setCurrentHSMSelected] = useState({})
    const [valuesToBeReplaced, setvaluesToBeReplaced] = useState([])
    const [updatedHSM, setUpdatedHSM ] = useState({})
    const [hsmVariables, setHsmVariables] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const handlePhoneChange = (e) => {
        const inputPhone = e.target.value
        const resultedPhones = insertMaskInPhone(inputPhone)
        setPhoneNumber(resultedPhones.unmaskedPhone)
        e.target.value = resultedPhones.maskedPhone
    }

    const getHSM = async () => {
        let response = await fetch(`${BASE_URL}/hsms`)
        let data = await response.json()
        setAvailableHSM(data)
        setCurrentHSMSelected(data[0])
        setUpdatedHSM(data[0])
        setIsLoading(false)
    }

    const handleHSMSelection = (e) => {
        let currentHSMId = parseInt(e.target.value)
        const filteredHSM = availableHSM.filter( HSMItem => parseInt(HSMItem.id) === currentHSMId)
        setUpdatedHSM(filteredHSM[0])
        setCurrentHSMSelected(filteredHSM[0])
    }

    const handleHSMSendMessage = async () => {
        if (AttendanceInfo){
            sendWhatsAppHSMMessage(AttendanceInfo.customer_phone_number, currentHSMSelected.name, hsmVariables, currentHSMSelected.language_code )
        }else {
            const complete_customer_phone = phoneDDD + phoneNumber
            sendWhatsAppHSMMessage(complete_customer_phone, currentHSMSelected.name, hsmVariables, currentHSMSelected.language_code )
        }

        setShowHSMPopUp(false)
    }


    const handleHSMVariablesReplaces = (valuesTobeReplaced) => {
        let updatedHSM = {
            "header":currentHSMSelected.header,
            "body": currentHSMSelected.body,
        }

        for( let key in valuesTobeReplaced){
            if(valuesTobeReplaced.hasOwnProperty(key)){
                if(Array.isArray(valuesTobeReplaced[key])){
                    valuesTobeReplaced[key].forEach((value, i) => {
                        if (hsmVariables[key] && hsmVariables[key][i]) {
                            updatedHSM[key] = updatedHSM[key].replace(`{{${i + 1}}}`, hsmVariables[key][i]);
                            setUpdatedHSM({ ...currentHSMSelected, ...updatedHSM });
                        }
                      });
                }
            }
        }
          
    }

    const handlePatternReplace = (event, index, variableLocation) => {
        let strIndex = `${index}`
        setHsmVariables({...hsmVariables, [variableLocation]: {...hsmVariables[variableLocation], [strIndex]: event.target.value}})  
    }


    useEffect(() => {
        const pattern = /\{\{[^\}]+\}\}/g;
        let headerMatches = (currentHSMSelected?.header || "").match(pattern) || [];
        let bodyMatches = (currentHSMSelected?.body || "").match(pattern) || [];
        let headerCounter = headerMatches.length;
        let bodyCounter = bodyMatches.length;

        let  hsmMatches = {
            "header": headerMatches,
            "body": bodyMatches,
        }

        console.log(`O padrão {{}} ocorre no corpo ${bodyCounter} no cabeçalho ${headerCounter} vezes matches ${JSON.stringify(hsmMatches)}`);
        setvaluesToBeReplaced(hsmMatches);

      }, [currentHSMSelected]);

    useEffect(() => {
        getHSM();
      }, []);

    useEffect( () => {
        handleHSMVariablesReplaces(valuesToBeReplaced)
    }, [hsmVariables])
    
    return (
    <div className="send-hsm-container">
        {isLoading ? (
            <div>
                loading...
            </div>
        ) : (
            <div>
                {isCreation && 
                    <div>
                        <div className="HSM-phone-input">
                            <label >DDD:</label>
                            <input required={true} maxLength={2} onChange={ (e) => setPhoneDDD(e.target.value)} type="number" />
                        </div>
                        <div className="HSM-phone-input">
                            <label htmlFor="phone_number_input">Número do contato:</label>
                            <input required={true} maxLength={15} onChange={ (e) => handlePhoneChange(e)} type="text" id="phone_number_input" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                        </div>
                    </div>
                }
                <select className="HSM-select-input" onChange={(e) => handleHSMSelection(e)} name="" id="">
                    <option value="Selecione um Modelo.">Selecione um Modelo.</option>
                    {availableHSM &&
                        availableHSM?.map(HSMItem => (
                            <option key={HSMItem.id} value={HSMItem.id}>{HSMItem.name}</option>
                        ))
                    }
                </select>

                {currentHSMSelected ? (
                    <div>
                        <div className="HSM-container">
                            <div className="HSM-message">
                                <div className="HSM-header">{updatedHSM?.header}</div>
                                <div className="HSM-body">{updatedHSM?.body}</div>
                                <div className="HSM-footer">{currentHSMSelected?.footer}</div>
                                <div className="HSM-buttons">
                                    {currentHSMSelected?.buttons?.map(buttonItem => (
                                        <button key={buttonItem.id} >{buttonItem.body}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="HSM-variables-container">
                            {valuesToBeReplaced.header?.length > 0 ? (
                                <div className="varible-header-itens">
                                    <div>Variveis do Cabeçalho:</div>
                                    {valuesToBeReplaced.header.map((value, index) => (
                                        <input key={index} onChange={(event) => handlePatternReplace(event, index, "header")} />
                                    ))}
                                </div>
                            ) : ""}
                            {valuesToBeReplaced.body?.length > 0 ? (
                                <div className="varible-body-itens">
                                    <div>Variaveis do corpo da mensagem:</div>
                                    {valuesToBeReplaced.body.map((value, index) => (
                                        <input key={index} onChange={(event) => handlePatternReplace(event, index, "body")} />
                                    ))}
                                </div>
                            ) : ""}
                        </div>
                        <div className="HSM-action-buttons">
                            <button type="submit" onClick={() => handleHSMSendMessage()}>Send</button>
                            <button onClick={() => setShowHSMPopUp(false)}>Close</button>
                        </div>
                    </div>
                ) : (
                    <div>Não foi selecionado nenhum modelo</div>
                )}
            </div>
        )}
    </div>
)
}