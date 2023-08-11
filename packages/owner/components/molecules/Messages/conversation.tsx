import styled from "styled-components";
import { useFormik } from 'formik';
import { Avatar } from "../../atoms";
import { AuthContext, UserInfoProps } from "../../../utils";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WEBSOCKET_URL } from "../../../services/ws";
import { AddPhoto, AudioCall, ChooseEmoji, ConvInfo, Like, VideoCall, VoiceClip } from "../../../contants";

const StyledConv = styled.div`
border-bottom: 1px solid #dbdbdb;
height: 4.5rem;
width: 100%;
display: flex;
flex-direction: column;
gap:1px;

header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px;

    .user__info{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }
    .action{
         display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
}

.message__container{
    
.type__message{
    bottom: 0;
    border: 1px solid black;
    width: 100%;
    border-radius: 40px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0px 10px 0px 10px;
    input{
        padding: 1rem;
        width: 75%;
        font-size: 20px;
        border: none;
        background-color: #f9f9f9;
    }


}

.messages {
    display: flex;
    flex-direction: column;
    gap:10px;
    overflow-y: scroll;
    height: 72vh;
    padding:10px;
    margin-bottom: 10px;
     .received{
      background-color: #f5efef;
      /* color: white; */
      font-size: 14px;


    }
    .sent{
      background-color: rgb(55, 151, 240);;
      color: white;
      font-size: 14px;
     align-self: flex-end;
  
    }

    .sent, .received{
      height: auto;
      min-height: 3rem;
      width: 50%;
      padding-left: 10px;
      border-radius: 25px;
      padding: 10px;
      p{
        font-size: 16px;
      }
    }
    .sent{
     align-self: flex-end;
    }
}
    .messages::-webkit-scrollbar {
    display: none;
  }
}

`

type Message = {
    content: string
    roomId: string
    user: UserInfoProps
    type?: "sent" | "received"
}
const Conversation = (props) => {
    const { activeRoomId, activeUser, conn, setConn } = props

    useEffect(() => {
        const ws = new WebSocket(`${WEBSOCKET_URL}/ws/join-room/${activeRoomId}?user_id=${user?.id}`)
        if (ws.OPEN) {
            setConn(ws)
        }
    }, [activeRoomId]);

    const router = useRouter()
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState<Array<Message>>([])
    const initialValues = {
        message: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            if (values.message != "") {
                const m: Message = {
                    content: values.message,
                    roomId: activeRoomId,
                    user: user,
                    type: "sent"
                }
                conn.send(values.message)
                actions.resetForm()


            }
        },
    });

    useEffect(() => {
        if (conn === null) {
            router.push('/inbox')
            return
        }
        conn.onmessage = (wsMessage) => {
            const m: Message = JSON.parse(wsMessage.data)
            user?.id === +m?.user?.id ? m.type = 'sent' : m.type = 'received'
            const msg = [...messages, m]
            setMessages(msg)

        }

        conn.onclose = () => {
        }
        conn.onerror = () => { }
        conn.onopen = () => { }
    }, [messages, conn])



    return (
        <StyledConv>
            <header>
                <div className={"user__info"}>
                    <Avatar size={"55"} image={activeUser?.dp} />
                    <h3>{activeUser?.full_name}</h3>
                </div>
                <div className={"action"}>
                    {AudioCall}
                    {VideoCall}
                    {ConvInfo}
                </div>
            </header>
            <div className={"message__container"}>
                <div className="messages">
                    {
                        messages?.map((obj) => {
                            return <div className={obj?.type}>{obj?.content}</div>
                        })

                    }


                </div>
                <form className={"type__message"} onSubmit={formik.handleSubmit}>
                    {ChooseEmoji}
                    <input
                        autoComplete="off"
                        className="email"
                        name={"message"}
                        value={formik?.values?.message}
                        type="text"
                        placeholder={"Message..."}
                        onChange={formik?.handleChange}
                    />
                    {VoiceClip}
                    {AddPhoto}
                    {Like}
                </form>

            </div>
        </StyledConv>
    )
}
export { Conversation };