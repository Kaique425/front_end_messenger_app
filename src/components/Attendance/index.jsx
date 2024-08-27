import {react} from "react"
import { useState, useRef, useEffect, memo } from 'react'
import { MessageLine } from "../AttendanceComponents/MessageLine"
import { CardFooter } from '../AttendanceComponents/CardFooter'
import { CardHeader } from "../AttendanceComponents/CardHeader"
import "./style.css"
import { sendWhatsAppMessage, sendMediaMessage } from '../../utils/whatsapp_functions'
import { ContextProvider } from "../../Contexts/GlobalContext"
import { BASE_URL, WS_BASE_URL } from "../../data/constants"

export const AttendanceComponent = ({ sectors, AttendanceInfo, OnCloseAttendance, currentAttendanceInfo}) => {
    const webSocket = useRef(null)
    const [messages, setMessages] = useState({})
    const [contextMessageId, setContextMessageId ] = useState(null)
    const [filteredMessageByContext, setFilteredMessageByContext] = useState(null)

    const setScrollToDown = () => {
        const scroll = document.querySelector("#messages")
        scroll.style.overflowY = "hidden"
        setTimeout(() => {
          scroll.scrollTop = scroll.scrollHeight
          }, 10)
        setTimeout(() => {
          scroll.style.overflowY = "auto"
          }, 100)
        }


    const getAttendanceMessages = async () => {
        try {
          const response = await fetch(`http://localhost:8000/attendances/history/${AttendanceInfo.id}`);
          const data = await response.json();

          const messagesById = {};
          data.forEach(message => {
            messagesById[message.id.toString()] = message;
          });

          setMessages(messagesById);
      } catch (error) {
          console.error('Erro ao obter mensagens do atendimento:', error);
      }
    }
    

    const sendMessage = async (file, message) => {
        let phone_number = AttendanceInfo.customer_phone_number
        if(file !== null){

          let messageData = await sendMediaMessage(file, message, phone_number)
         
          setMessages(prevState => ({...prevState, [messageData.id]: messageData,}))
        }else{
          const messageData = await sendWhatsAppMessage(message, phone_number, contextMessageId)
          setMessages(prevState => ({...prevState, [messageData.id]:messageData,}))
        }
      }
  

     const getMessageByContext = (messageId) => {
        if(messageId){
          const messagesArray = Object.values(messages)
          let filteredMessage = messagesArray.filter(messageItem => String(messageItem.id) === String(messageId))
          return filteredMessage[0]
        }else{
          return false
        }
     }
    

     useEffect( () => {
        setScrollToDown()
     }, [messages])


     useEffect(() => {
       if (contextMessageId) {
         setFilteredMessageByContext(undefined)
         let filtered_message;
         filtered_message = getMessageByContext(contextMessageId);
         setFilteredMessageByContext(filtered_message)
        }
      }, [contextMessageId]);
      
      
      useEffect(() => {
        setScrollToDown()
        getAttendanceMessages()

        
        const phone_number = `waent_${AttendanceInfo.customer_phone_number}`
        let url = `${WS_BASE_URL}/ws/socket-server/chat/${phone_number}`
        const ws = new WebSocket(url)
        webSocket.current = ws
    
    
        ws.onmessage = (event) => {
          let data = JSON.parse(event.data)
          
          if(data.type === "chat"){
    
            let message_object = {}
      
            const message = JSON.parse(data.message)
            message_object = {
              "id": message.id,
              "body": message.body,
              "status": message.status,
              "send_by_operator": message.send_by_operator,
              "created_at": message.created_at,
              "type": message.type,
              "contacts": message.contacts,
              "context": message.context,
              "hsm_footer": message.hsm_footer,
              "hsm_header": message.hsm_header,
              "hsm_buttons": message.hsm_buttons,
            }
            if (message.type !== "text"){
              message_object = {...message_object, "media_url":message.media_url}
            }
    
            setMessages(prevState => ({...prevState, [message.id]:message_object,}))
          }
          if(data.type === "update_notification"){
            const message = JSON.parse(data.message)
            
            const message_id = message.id.toString()
            
            const messageTobeUpdated = {
              ...messages[message_id],
              ...message
            }
            

            if(messageTobeUpdated){
              setMessages(prevState => ({...prevState, 
                [message.id]:{
                ...prevState[message.id],
                ...message
              }
            }))
    
            }
          }
        }


        
      return () => {
        if (webSocket.current.readyState === WebSocket.OPEN) {
          webSocket.current.close();
        }
        webSocket.current.onmessage = null;
        webSocket.current.onclose = null;
      };
    }
  , [])
  
   

    return(
      <ContextProvider>
        <div className="card-container" >
          <div className="card">
            <CardHeader setMessages={setMessages} sectors={sectors} AttendanceInfo={AttendanceInfo} handleAttendanceClose={OnCloseAttendance}/>
              <div className="messages-container" id="messages" >
                  { Object.values(messages).map(message => (
                  <MessageLine AttendanceInfo={AttendanceInfo} setContext={setContextMessageId} key={message.id} message={message} context={getMessageByContext(message.context)}/>
                  ))}
              </div>
              <div>
                    {contextMessageId && 
                      <div className="reply-box" >
                        <div className="filtered-reply-message" >{filteredMessageByContext?.body}</div>
                        <button onClick={() => setContextMessageId(null)}>X</button>
                      </div>
                    }

              </div>
              <CardFooter setContextMessageId={setContextMessageId} sendMessage={sendMessage}/>
          </div>
        </div>
      </ContextProvider>

    )
}

export const Attendance = memo(AttendanceComponent)