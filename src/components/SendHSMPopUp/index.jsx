import './style.css';
import { useState, useEffect } from 'react';
import { sendWhatsAppHSMMessage } from '../../utils/whatsapp_functions';
import { BASE_URL } from '../../data/constants';
import { inputHandlePhoneChange } from '../../utils/phoneMask';
import { TemplatePreview } from '../TemplatePreview';

export const SendHSMPopUp = ({
  setShowHSMPopUp,
  AttendanceInfo,
  isCreation,
}) => {
  const [availableHSM, setAvailableHSM] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneDDD, setPhoneDDD] = useState();
  const [currentHSMSelected, setCurrentHSMSelected] = useState({});
  const [valuesToBeReplaced, setvaluesToBeReplaced] = useState([]);
  const [updatedHSM, setUpdatedHSM] = useState({});
  const [hsmVariables, setHsmVariables] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getHSM = async () => {
    let response = await fetch(`${BASE_URL}/hsms`);
    let data = await response.json();
    setAvailableHSM(data);
    setCurrentHSMSelected(data[0]);
    setUpdatedHSM(data[0]);
    setIsLoading(false);
  };

  const handleHSMSelection = (e) => {
    let currentHSMId = parseInt(e.target.value);
    const filteredHSM = availableHSM.filter(
      (HSMItem) => parseInt(HSMItem.id) === currentHSMId,
    );
    setUpdatedHSM(filteredHSM[0]);
    setCurrentHSMSelected(filteredHSM[0]);
  };

  const handleHSMSendMessage = async () => {
    const hsm_formatted_fields = {
      body: updatedHSM.body,
      header: updatedHSM.header,
      footer: currentHSMSelected.footer,
      buttons: currentHSMSelected.buttons,
    };
    if (AttendanceInfo) {
      sendWhatsAppHSMMessage(
        hsm_formatted_fields,
        AttendanceInfo.customer_phone_number,
        currentHSMSelected.name,
        hsmVariables,
        currentHSMSelected.language_code,
        isCreation,
      );
    } else {
      const complete_customer_phone = phoneDDD + phoneNumber;
      sendWhatsAppHSMMessage(
        hsm_formatted_fields,
        complete_customer_phone,
        currentHSMSelected.name,
        hsmVariables,
        currentHSMSelected.language_code,
        isCreation,
      );
    }

    setShowHSMPopUp(false);
  };

  const handleHSMVariablesReplaces = (valuesTobeReplaced) => {
    let updatedHSM = {
      header: currentHSMSelected.header,
      body: currentHSMSelected.body,
    };

    for (let key in valuesTobeReplaced) {
      if (valuesTobeReplaced.hasOwnProperty(key)) {
        if (Array.isArray(valuesTobeReplaced[key])) {
          valuesTobeReplaced[key].forEach((value, i) => {
            if (hsmVariables[key] && hsmVariables[key][i]) {
              updatedHSM[key] = updatedHSM[key].replace(
                `{{${i + 1}}}`,
                hsmVariables[key][i],
              );
              setUpdatedHSM({ ...currentHSMSelected, ...updatedHSM });
            }
          });
        }
      }
    }
  };

  const handlePatternReplace = (event, index, variableLocation) => {
    let strIndex = `${index}`;
    setHsmVariables({
      ...hsmVariables,
      [variableLocation]: {
        ...hsmVariables[variableLocation],
        [strIndex]: event.target.value,
      },
    });
  };

  useEffect(() => {
    const pattern = /\{\{[^\}]+\}\}/g;
    let headerMatches = (currentHSMSelected?.header || '').match(pattern) || [];
    let bodyMatches = (currentHSMSelected?.body || '').match(pattern) || [];
    let headerCounter = headerMatches.length;
    let bodyCounter = bodyMatches.length;

    let hsmMatches = {
      header: headerMatches,
      body: bodyMatches,
    };

    console.log(
      `O padrão {{}} ocorre no corpo ${bodyCounter} no cabeçalho ${headerCounter} vezes matches ${JSON.stringify(hsmMatches)}`,
    );
    setvaluesToBeReplaced(hsmMatches);
  }, [currentHSMSelected]);

  useEffect(() => {
    getHSM();
  }, []);

  useEffect(() => {
    handleHSMVariablesReplaces(valuesToBeReplaced);
  }, [hsmVariables]);

  return (
    <div>
      <div className='hsm-container'></div>
      <div className='send-hsm-container'>
        <div className='hsm-container-title'>
          <strong>Enviar um novo Modelo</strong>
        </div>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <div>
            {isCreation && (
              <div className='phone-inputs'>
                <div className='HSM-ddd-phone-input'>
                  <label htmlFor='ddd-input'>
                    <strong>DDD:</strong>
                  </label>
                  <input
                    id='ddd-input'
                    required={true}
                    maxLength={2}
                    onChange={(e) => setPhoneDDD(e.target.value)}
                    type='text'
                  />
                </div>
                <div className='HSM-phone-input'>
                  <label htmlFor='phone_number_input'>
                    <strong>Número do contato:</strong>
                  </label>
                  <input
                    required={true}
                    maxLength={15}
                    onChange={(e) => inputHandlePhoneChange(e, setPhoneNumber)}
                    type='text'
                    id='phone_number_input'
                    pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                  />
                </div>
              </div>
            )}
            <select
              className='HSM-select-input'
              onChange={(e) => handleHSMSelection(e)}
              name=''
              id=''
            >
              <option value='Selecione um Modelo.'>Selecione um Modelo.</option>
              {availableHSM &&
                availableHSM?.map((HSMItem) => (
                  <option key={HSMItem.id} value={HSMItem.id}>
                    {HSMItem.name}
                  </option>
                ))}
            </select>

            {currentHSMSelected ? (
              <div>
                <TemplatePreview
                  templateData={{
                    header: updatedHSM.header,
                    body: updatedHSM.body,
                    footer: currentHSMSelected.footer,
                    buttons: currentHSMSelected.buttons,
                  }}
                />
                <div className='HSM-variables-container'>
                  {valuesToBeReplaced.header?.length > 0 ? (
                    <div className='varible-header-itens'>
                      <div>
                        <strong>Variveis do Cabeçalho:</strong>
                      </div>
                      {valuesToBeReplaced.header.map((value, index) => (
                        <input
                          key={index}
                          onChange={(event) =>
                            handlePatternReplace(event, index, 'header')
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                  {valuesToBeReplaced.body?.length > 0 ? (
                    <div className='varible-body-itens'>
                      <div>
                        <strong>Variaveis do corpo da mensagem:</strong>
                      </div>
                      {valuesToBeReplaced.body.map((value, index) => (
                        <input
                          key={index}
                          onChange={(event) =>
                            handlePatternReplace(event, index, 'body')
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='HSM-action-buttons'>
                  <button
                    className='send-button'
                    type='submit'
                    onClick={() => handleHSMSendMessage()}
                  >
                    Enviar
                  </button>
                  <button
                    className='close-button'
                    onClick={() => setShowHSMPopUp(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            ) : (
              <div className='select-hsm-message'>
                Não foi selecionado nenhum modelo!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
