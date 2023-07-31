import { Avatar } from "../../atoms";


const ConversationList = (props) => {
    const { data, setActiveConv } = props

    return (
        <ul className="message-list-content">
            {
                data?.map(conv => {
                    return (
                        <li style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }} onClick={() => setActiveConv(conv?.user_id)}>
                            <Avatar size={"80"} image={conv?.dp} />
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                                <p style={{ fontWeight: "bolder" }}>{conv.full_name}</p>
                                <p style={{ fontWeight: "bold", fontSize: "14px" }}>{conv.last_message} <span>. {conv.messaged_at}</span></p>
                            </div>

                        </li>
                    )
                })
            }
        </ul>
    )
}
export { ConversationList };