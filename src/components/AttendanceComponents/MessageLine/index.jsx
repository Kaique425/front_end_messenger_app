import React from "react"

import {SendedCheck } from "../Icons/Sended";
import { SeenCheck } from "../Icons/Seen"
import { SentCheck } from "../Icons/Sent"
import "./style.css"
import {AudioMessage} from "../AudioMessage/Index"
import { ImageMessage } from "../ImageMessage/index.jsx"
import { TextMessage } from "../TextMessage/index.jsx"
import { VideoMessage } from "../VideoMessage";
import { ContactMessage } from "../ContactMessage";

import { useEffect } from "react";
import { StickerMessage } from "../StickerMessage";
export const MessageLine = ({message, context, setContext}) => {
    console.log(`${JSON.stringify(message.type)} ${context}`)
    const formatedDate = new Date(message.created_at).toLocaleString([], {hour: 'numeric', minute:'numeric', second:"numeric"})
    useEffect(() =>{
    }, [message])
    return (
            message.send_by_operator?
                <div className="messageLine operatorSide">
                    <div className="operatorMessageItem" >
                    {context && 
                                <div className="reply-message" >
                                <div>
                                    <div className="sender-name" >Operador</div>
                                    <div className="replied-message" >{context.body}</div>
                                </div>
                                {context.media_url &&
                                <img className="replied-img" src={context.media_url} alt="" />
                                
                                }
                            </div>}
                        {message.type === "image" || message.type === "sticker"?(
                            <ImageMessage caption={message.body} date={formatedDate} imageSource={message.media_url} />
                        ):message.type === "video"?(
                            <VideoMessage date={formatedDate} videoSource={message.media_url} textMessage={message.body} />
                        ):message.type === "audio"?(
                            <AudioMessage date={formatedDate} audioSource={message.media_url} />
                        ):message.type === "text"?(
                            <TextMessage date={formatedDate} textMessage={message.body} />
                        ):(
                            <div>Não tem tipo {message.type}</div>
                        )}

                        <div className="message-infos">
                            <div className="message-date" >
                                <div>{formatedDate}</div>
                                    {   message.status === "sent"?(
                                            <SentCheck/>
                                        ):message.status === "delivered"?(
                                            <SendedCheck/>
                                        ):(
                                            <SeenCheck/>
                                        )
                                    }
                            </div>
                        </div>
                    </div>
                </div>:
            <div className="messageLine customerSide">
                    { message.type === "audio"?(
                        <AudioMessage date={formatedDate} audioSource={message.media_url} />
                    ): message.type === "sticker"?(
                        <StickerMessage date={formatedDate} imageSource={message.media_url} />
                    ):
                    <div className="operatorMessageItem" >
                        <button className="reply-message-button" onClick={() => setContext(message.id)} >
                        <svg className="reply-svg" version="1.1" id="Capa_1"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 27.361 27.361" xmlSpace="preserve">
                            <g>
                                <path d="M0,12.022l9.328-9.328v4.146h9.326c4.809,0,8.707,3.898,8.707,8.706v9.12c0-4.81-3.898-8.704-8.707-8.704H9.328v5.389
                                    L0,12.022z"/>
                            </g>
                        </svg>

                        </button>
                                {context && 
                                    <div className="reply-message" >
                                    <div>
                                        <div className="sender-name" >Operador</div>
                                        <div className="replied-message" >{context.body}</div>
                                    </div>
                                    {context.media_url &&
                                    <img className="replied-img" src={context.media_url} alt="" />
                                    
                                    }
                                </div>}
                            {message.media_url &&

                            message.type === "image"?(
                                <ImageMessage caption={message.body} date={formatedDate} imageSource={message.media_url} />
                            ):message.type === "video"?(
                                <VideoMessage date={formatedDate} videoSource={message.media_url} textMessage={message.body} />
                            ):message.type === "audio"?(
                                <AudioMessage date={formatedDate} audioSource={message.media_url} />
                            ):message.type === "text"?(
                                <TextMessage date={formatedDate} textMessage={message.body} context={context} />
                            ):(
                                <ContactMessage date={formatedDate} contactMessage={message} />
                            )
                            }
                            <div className="message-date">{formatedDate}</div>
                        </div>
                    
                    }
            </div>
    )
}
