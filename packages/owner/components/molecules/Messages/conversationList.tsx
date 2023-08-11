import { useQuery } from "react-query";
import { Avatar } from "../../atoms";
import { notification } from "antd";
import { MyConversations } from "../../../services";
import { ReadableTime, WebsocketContext } from "../../../utils";
import { useContext } from "react";


const ConversationList = (props) => {
    const { setActiveConv, setActiveUser } = props
    const { data: my_conv } = useQuery("my-conversations", MyConversations, {
        refetchOnWindowFocus: false,
        onError: (error: any) => {
            console.log("Something went wrong while fetching", error)

            notification.error({
                message: error?.message
            })

        }
    });


    return (
        <ul className="message-list-content">
            {
                my_conv?.data?.map(conv => {
                    return (
                        <li style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }} onClick={() => {
                            setActiveConv(conv?.room_id)
                            setActiveUser(conv?.user)
                        }}
                        >
                            <Avatar size={"80"} image={conv?.dp} />
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                                <p style={{ fontWeight: "bolder" }}>{conv?.user?.full_name}</p>
                                <p style={{ fontWeight: "bold", fontSize: "14px" }}>{conv?.last_message} <span> {ReadableTime(conv?.created_at)}</span></p>
                            </div>

                        </li>
                    )
                })
            }
        </ul>
    )
}
export { ConversationList };