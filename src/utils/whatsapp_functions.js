import { BASE_URL } from "../data/constants";

export const sendMediaMessage = async (file, caption, phone_number) => {
        const formData = new FormData()
        
        formData.append("type", "image");
        formData.append("status", "sent");
        // formData.append("contacts", "27");
        formData.append("body", caption);
        formData.append("media_url", file)
        formData.append("phone_number", phone_number)
        formData.append("origin_identifier", phone_number)

        let response = await fetch(`${BASE_URL}/messages/midia`, {
            method: "POST",
            body: formData,
        })
        let data = response.json()
        return data
    }

export const sendWhatsAppMessage = async (message, phone_number, message_context_id) => {
    let body = {
      "phone_number": phone_number,
      "body": message,
      "type": "text",
      "origin_identifier": phone_number,
    }

    if (message_context_id){
      body = {...body,"context": message_context_id }
    }
    const response = await fetch(`${BASE_URL}/messages`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
      })

      let data = response.json()
      return data
    }

export const sendWhatsAppHSMMessage = async (hsm_formatted_fields, phone_number, hsm_name, components, code, isCreation) => {
      const mountedComponents = []
      Object.keys(components).forEach(key => {

          mountedComponents.push({
            type: key,
            values: [
              ...Object.values(components[key])
            ]
          })
      })

      const  buttons = hsm_formatted_fields.buttons.map(button => button.body)
      const response = await fetch(`${BASE_URL}/messages/hsm`, {
                  method: "POST",
                  headers: {
                      "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                    "body": hsm_formatted_fields.body,
                    "hsm_footer":  hsm_formatted_fields.footer,
                    "hsm_header": hsm_formatted_fields.header,
                    "hsm_buttons": buttons,
                    "phone_number":phone_number,
                    "hsm_name": hsm_name,
                    "code":code,
                    "components":mountedComponents ? mountedComponents: [],
                    "isCreation": isCreation,
                  })
              })


}
