import styled from "styled-components";
import { useFormik } from 'formik';
import { Avatar } from "../../atoms";

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
const Conversation = (props) => {
    const { data } = props
    const initialValues = {
        message: ""
    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            if (values.message != "") {
                const date = new (Date)
                data?.messages?.push({
                    text: values?.message,
                    created_at: date,
                    message_by: 0,
                })
                actions.resetForm()
            }
        },
    });
    const choose_emoji = <svg aria-label="Choose an emoji" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Choose an emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
    const voice_clip = <svg aria-label="Voice Clip" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Voice Clip</title><path d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19.068" y2="22"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8.706" x2="15.104" y1="22" y2="22"></line><path d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
    const add_photo = <svg aria-label="Add Photo or Video" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Add Photo or Video</title><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fill-rule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
    const like = <svg aria-label="Like" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
    return (
        <StyledConv>
            <header>
                <div className={"user__info"}>
                    <Avatar size={"55"} image={data?.dp} />
                    <h3>{data?.full_name}</h3>
                </div>
                <div className={"action"}>
                    <svg aria-label="Audio call" className="_ab6-" color="rgb(14, 14, 14)" fill="rgb(14, 14, 14)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path></svg>
                    <svg aria-label="Video call" className="_ab6-" color="rgb(14, 14, 14)" fill="rgb(14, 14, 14)" height="24" role="img" viewBox="0 0 24 24" width="24"><rect fill="none" height="18" rx="3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="16.999" x="1" y="3"></rect><path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                    <svg aria-label="Conversation information" className="x1lliihq x1n2onr6" color="rgb(14, 14, 14)" fill="rgb(14, 14, 14)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Conversation information</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
                </div>
            </header>
            <div className={"message__container"}>
                <div className="messages">
                    {
                        data?.messages?.map((obj) => {
                            const className = obj?.message_by === 0 ? "sent" : "received"
                            return <div className={className}>{obj?.text}</div>
                        })

                    }


                </div>
                <form className={"type__message"} onSubmit={formik.handleSubmit}>
                    {choose_emoji}
                    <input
                        autoComplete="off"
                        className="email"
                        name={"message"}
                        value={formik?.values?.message}
                        type="text"
                        placeholder={"Message..."}
                        onChange={formik?.handleChange}
                    />
                    {voice_clip}
                    {add_photo}
                    {like}
                </form>

            </div>
        </StyledConv>
    )
}
export { Conversation };