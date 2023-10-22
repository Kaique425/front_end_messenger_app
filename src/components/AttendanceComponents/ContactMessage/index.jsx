import "./style.css"

export const ContactMessage = ({contactMessage, date}) => {

    return (
        <div className="contact-container" key={contactMessage.id}  >
             {contactMessage?.contacts.map( (contact) => (
               <div className="contact-item" >
                   <div>
                        <div className="contact-name" >{contact.name}</div>
                        <div className="contact-number" >{contact.phone}</div>
                   </div>
                    <button className="contact-add-button" >&#9547;</button>
               </div>
             ))}
             <div className="message-date">{date}</div>
        </div>
    )
}