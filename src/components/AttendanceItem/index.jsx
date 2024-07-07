import { WhatsAppIcon } from "../AttendanceComponents/Icons/WhatsAppIcon"
import "./style.css"

export const AttendanceItem = ({attendanceItem, openAttandance}) => {

    return(
        <div className="attendance-item" key={attendanceItem.customer_phone_number} onClick={() => openAttandance(attendanceItem)}>
            <div className="attendance-infos">
                <WhatsAppIcon/>
                <div>
                    <div><strong>{attendanceItem.customer_name}</strong></div>
                    <div>{attendanceItem.customer_phone_number}</div>
                    { attendanceItem.unread_messages_quantity !== 0 &&
                        <span className="unread-message-quantity" >{attendanceItem.unread_messages_quantity}</span>
                     }
                </div>
            </div>
            <div className="attendance-metrics-container">
                <div className="metric-item" >TME:</div>
                <div className="metric-item" >TMO:</div>
            </div>
            { attendanceItem.last_message_was_sent_by_operator ? 
                <div className="attendance-state read-messages" ></div>:
                <div className="attendance-state unread-messages" ></div>
            }
        </div>
    )
}