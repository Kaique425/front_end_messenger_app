import {useState, useEffect} from "react"
import {dateFormater} from "./modules/dateFormater"
import { BASE_URL } from "./src/constants"

const Channels = () => {
    const [ channels, setChannels] = useState([])

    const getChannels = async () => {
        const response = await fetch(`${BASE_URL}/channels`)
        console.log(`${BASE_URL}/channels`)
        const data = await response.json()
        setChannels(data)
        console.log(channels)
    }

    useEffect( () => {
        getChannels()
        console.log(channels)
    }, [])

    return (
        <div className="channels-container-desc">
                <div>
                <h1 className="channels-page-title">Canais WhatsApp Business</h1>
                <div className="channels-page-desc" >Visualize/Gerencie os canais Business API da sua empresa:</div>
                </div>
                <div className="channels-container">
                    {   
                        channels && channels.map(channel => (
                                <div key={channel.id} className="channel-item">
                                    <div className="channel-item-div">
                                        <div><strong>ID do canal:</strong> {channel.id}</div>
                                        <div><strong>ID externo do canal:</strong> {channel.channel_external_id}</div>
                                        <div><strong>Número do canal:</strong> {channel.channel_phone}</div>
                                    </div>
                                    <div className="channel-item-div" >
                                        <div><strong>Nome:</strong>:{channel.channel_name}</div>
                                        <div><strong>Setor Padrão: </strong>{channel.default_sector}</div>
                                    </div>
                                    <div className="channel-item-div" >
                                        <div><strong>Criado em: </strong>{dateFormater(channel.created_at)}</div>
                                        <div><strong>Atualizado em: </strong>{dateFormater(channel.updated_at)}</div>
                                    </div>
                                </div>
                        ))
                        
                    }

                </div>
        </div>
    )
} 

export default Channels