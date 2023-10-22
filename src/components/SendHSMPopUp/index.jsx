import "./style.css"
import { useState, useEffect } from "react"
import { sendWhatsAppHSMMessage } from "../../whatsapp_functions"
import { BASE_URL } from "../../constants"

export const SendHSMPopUp = ({setShowHSMPopUp, AttendanceInfo}) => {
    const [availableHSM, setAvailableHSM]  = useState([])
    const [currentHSMSelected, setCurrentHSMSelected] = useState({})
    const [valuesToBeReplaced, setvaluesToBeReplaced] = useState([])
    const [updatedHSM, setUpdatedHSM ] = useState({})
    const [hsmVariables, setHsmVariables] = useState({})


    const getHSM = async () => {
        let response = await fetch(`${BASE_URL}/hsms`)
        let data = await response.json()
        console.log(`CARREGOU ${JSON.stringify(data)}`)
        setAvailableHSM(data)
        console.log(`ANTES DE SELECIOANR ${JSON.stringify(currentHSMSelected)}`)
        setCurrentHSMSelected(data[0])
        setUpdatedHSM(data[0])
    }

    const handleHSMSelection = (e) => {
        let currentHSMId = parseInt(e.target.value)
        console.log(`SELECIONOU ${e.target.value} `)
        const filteredHSM = availableHSM.filter( HSMItem => parseInt(HSMItem.id) === currentHSMId)
        console.log(`FILTRADO ${filteredHSM[0].id}`)
        setUpdatedHSM(filteredHSM[0])
        setCurrentHSMSelected(filteredHSM[0])
    }

    const handleHSMSendMessage = async () => {
        console.log(`ATTENDANCE INFO!!!!!! ---> ${JSON.stringify(AttendanceInfo)}`)
        sendWhatsAppHSMMessage(AttendanceInfo.customer_phone_number, "iniciar_contato_com_o_cliente", hsmVariables, currentHSMSelected.language_code )
        setShowHSMPopUp(false)
    }


    const handleHSMVariablesReplaces = (valuesTobeReplaced) => {
        console.log(`HSM VARIABLES ${JSON.stringify(hsmVariables)}`)
        let updatedHSM = {
            "header":currentHSMSelected.header,
            "body": currentHSMSelected.body,
        }

        for( let key in valuesTobeReplaced){
            if(valuesTobeReplaced.hasOwnProperty(key)){
                if(Array.isArray(valuesTobeReplaced[key])){
                    valuesTobeReplaced[key].forEach((value, i) => {
                        if (hsmVariables[key] && hsmVariables[key][i]) {
                            console.log(`{{${i + 1}}}  --> ${updatedHSM[key]}`);
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
        console.log("HEADER MESSAGE" + (currentHSMSelected.header ? currentHSMSelected.header : ""));
        let headerMatches = (currentHSMSelected.header || "").match(pattern) || [];
        let bodyMatches = (currentHSMSelected.body || "").match(pattern) || [];
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
    return(
        <div className="send-hsm-container" >
            {
                availableHSM.length === 0?(
                    <div>
                        loading...
                    </div>
                ):(
                    <div>
                    <div className="HSM-phone-input">
                <label htmlFor="phone_number_input">Phone Number</label>
                <input type="text" id="phone_number_input"/>
            </div>
            <select className="HSM-select-input" onChange={(e) => handleHSMSelection(e)} name="" id="">
                {availableHSM &&
                    availableHSM?.map(HSMItem => (
                        <option key={HSMItem.id} value={HSMItem.id} >{HSMItem.name}</option>
                    ))

                }

            </select>
                <div className="HSM-container" >
                        <div className="HSM-message" > 
                            <div className="HSM-header" >{updatedHSM.header}</div>
                            <div className="HSM-body">{updatedHSM.body}</div>
                            <div className="HSM-footer" >{currentHSMSelected.footer}</div>
                            <div className="HSM-buttons">
                            {currentHSMSelected.buttons?.map(buttonItem => (
                            <button>{buttonItem.body}</button>
                            ))}
                            </div>
                        </div>
                </div>
                <div className="HSM-variables-container">
                    {valuesToBeReplaced.header?.length > 0?(
                        <div className="varible-header-itens">
                            <div>Header Variables:</div>
                            {valuesToBeReplaced.header.map((value, index) => (
                            <input key={index} onChange={(event) => handlePatternReplace(event, index,"header")} />
                            )) }
                        </div>
                    ): ""
                    }
                    {valuesToBeReplaced.body?.length > 0?(
                        <div className="varible-body-itens">
                            <div>Body Variables:</div>
                            {valuesToBeReplaced.body.map((value, index) => (
                            <input key={index} onChange={(event) => handlePatternReplace(event, index,"body")} />
                            )) }
                        </div>
                    ): ""
                    }
                </div>
             <div className="HSM-action-buttons">
                <button onClick={() => handleHSMSendMessage()} >Send</button>
                <button onClick={() => setShowHSMPopUp(false)} >Close</button>
             </div>
                    </div>
                )
            }
        </div>
    )
}