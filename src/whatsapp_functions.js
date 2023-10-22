import { BASE_URL } from "./constants";

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
      console.log("+_+_+_+_+_+_+_+_+_+_+" + body.context)
    }
    const response = await fetch(`${BASE_URL}/messages`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
      })
      console.log("------>" + JSON.stringify(body))
      let data = response.json()
        return data
    }

export const sendWhatsAppHSMMessage = async (phone_number, hsm_name, components, code) => {
      const mountedComponents = []
      Object.keys(components).forEach(key => {

          mountedComponents.push({
            type: key,
            values: [
              ...Object.values(components[key])
            ]
          })
      })
      console.log(`MOUNTED --> ${JSON.stringify(mountedComponents)}`)
      const response = await fetch(`${BASE_URL}/messages/hsm`, {
                  method: "POST",
                  headers: {
                      "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                    "phone_number":phone_number,
                    "hsm_name": hsm_name,
                    "code":code,
                    "components":mountedComponents ? mountedComponents: []
                  })
              })


}
