import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './messages.css'
import { MessageList } from "./message_list";
import { MessageEditor } from "./edit_message";
import { Message } from "./model";


const EMPTY_MESSAGES : Message[] = []

function Messages () {
    const [messages, setMessages] = useState(EMPTY_MESSAGES)
    const [currentMsgId, setCurrentMsgId] = useState(-1)
    const [currentMessage, setCurrentMessage] = useState(new Message())
    // const [counter, setCounter] = useState(0)

    const saveMessage = (msg: Message | undefined) => {
        if (msg === undefined) {
            setCurrentMsgId(-1)
            setCurrentMessage(new Message())
        } else {
            console.log("addMessage", msg)
            // messages.push(msg)
            // setMessages([...messages, msg])
            // setCounter(counter + 1)
            // const currMsg = messages.find(msg => msg.id === msgId)
            setMessages(messages.map(m => m.id === msg.id ? msg : m))
            setCurrentMessage(msg)
        }
    }

    const processMessage = (msgId: number, action: string) => {
        console.log("processMessage", `action: ${action}`)
        if (action === 'delete') {
            setMessages(messages.filter( msg => msg.id !== msgId))
            setCurrentMsgId(-1)
        } else { // 'edit'
            setCurrentMsgId(msgId)
            const currMsg = messages.find(msg => msg.id === msgId)
            setCurrentMessage(currMsg === undefined ? new Message() : currMsg)
            // if (currMsg !== undefined) {
            //     setCurrentMessage(currMsg)
            //     console.log("processMessage", `currMessage = ${currMsg}`)
            //     // setTimeout( () => setCounter(counter + 1), 1000)
            // }
        }
    }

    const addMessage = () => {
        const msg = new Message()
        msg.id = messages.map( msg => msg.id).reduce ( (p, v) => p > v ? p : v, 0) + 1
        msg.subject = "Subject #" + msg.id
        msg.content = "Body #" + msg.id
        setMessages([...messages, msg])
    }

    return (
        <div className="messages">
            <div className="messages-header">Messages (total: {messages.length} messages)</div>
            <div className="messages-header-actions">
                <Stack spacing={2} direction="row">
                    {/* <Button variant="text" onClick={addMessage}>Create a new message</Button>
                    <Button variant="contained" onClick={addMessage}>Create a new message</Button> */}
                    <Button variant="contained" onClick={addMessage}>Create a new message</Button>
                </Stack>
            </div>
            <div className="messages-content">
                <div className="message-list">
                    <MessageList 
                        messages={messages} 
                        currentMessageId={currentMsgId} 
                        setCurrentMsgId={setCurrentMsgId} 
                        processMessage={processMessage}/>
                </div>
                <div className="message-editor">
                    {/* <MessageEditor message={messages.find(msg => msg.id === currentMsgId)} saveMessage={saveMessage}/> */}
                    <MessageEditor display={currentMsgId !== -1} enabled={currentMsgId !== -1}
                        message={currentMessage} saveMessage={saveMessage}/>
                </div>
            </div>
        </div>
    )
}

export {Messages}