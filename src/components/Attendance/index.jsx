import {react} from "react"
import { useState, useRef, useEffect, memo } from 'react'
import { MessageLine } from "../AttendanceComponents/MessageLine"
import { CardFooter } from '../AttendanceComponents/CardFooter'
import { CardHeader } from "../AttendanceComponents/CardHeader"
import "./style.css"
import { sendWhatsAppMessage, sendMediaMessage } from '../../whatsapp_functions'
import { ContextProvider } from "../../Contexts/GlobalContext"
import { BASE_URL, WS_BASE_URL } from "../../constants"

export const AttendanceComponent = ({ sectors, AttendanceInfo, OnCloseAttendance, currentAttendanceInfo}) => {
    const webSocket = useRef(null)
    const [messages, setMessages] = useState({})
    const [contextMessageId, setContextMessageId ] = useState(null)
    const [filteredMessageByContext, setFilteredMessageByContext] = useState(null)

    const setScrollToDown = () => {
        const scroll = document.querySelector("#messages")
        setTimeout(() => {
          scroll.scrollTop = scroll.scrollHeight

        }, 100)
        console.log(`------${scroll}´`)
    }
    const getAttendanceMessages = async () => {
      let response = await fetch(`${BASE_URL}/attendances/history/${AttendanceInfo.id}`)
      let data = await response.json()
      setMessages({...data})
    }
    
    const sendMessage = async (file, message) => {
        let phone_number = AttendanceInfo.customer_phone_number
        if(file !== null){
          let message_object = {}
          let messageData = await sendMediaMessage(file, message, phone_number)
          message_object = {
            "id": messageData.id,
            "body": messageData.body,
            "status": messageData.status,
            "send_by_operator": messageData.send_by_operator,
            "created_at": messageData.created_at,
            "type": messageData.type,
            "contacts": messageData.contacts,
            "context": messageData.context,
            "media_url": messageData.media_url
          }
  
          setMessages(prevState => ({...prevState, [messageData.id]:message_object,}))
        }else{
          await sendWhatsAppMessage(message, phone_number, contextMessageId)

        
  
        webSocket.current.send(JSON.stringify({
          "message": message,
          "operator_id": 13,
          "send_by_operator":true
        }))
  
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
      let url = `${WS_BASE_URL}/ws/socket-server/${phone_number}`
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
            "context": message.context
          }
          if (message.type !== "text"){
            message_object = {...message_object, "media_url":message.media_url}
          }
  
          setMessages(prevState => ({...prevState, [message.id]:message_object,}))
        }
        if(data.type === "update_notification"){
          const message = JSON.parse(data.message)
  
          const messageTobeUpdated = messages[message.id.toString()]
  
          if(messageTobeUpdated){
            setMessages(prevState => ({...prevState, 
              [message.id]:{
              ...prevState[message.id],
              "status": message.status
            }
          }))
  
          }else{
            let message_object = {
              "id": message.id,
              "body": message.body,
              "status": message.status,
              "send_by_operator": message.send_by_operator,
              "created_at": message.created_at,
              "type": message.type,
              "media_url":message.media_url,
              "context":message.context
            } 
            setMessages(prevState => ({...prevState, [message.id]:message_object,}))
          }
        }
        console.log(JSON.stringify(messages))
        
        return () => {
          webSocket.current.close()
        }
      }}
  , [])
  
   

    return(
      <ContextProvider>
        <div className="card-container" >
          <div className="card">
            <CardHeader sectors={sectors} AttendanceInfo={AttendanceInfo} handleAttendanceClose={OnCloseAttendance}/>
              <div className="messages-container" id="messages" >
                  { Object.values(messages).map(message => (
                  <MessageLine setContext={setContextMessageId} key={message.id} message={message} context={getMessageByContext(message.context)}/>
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