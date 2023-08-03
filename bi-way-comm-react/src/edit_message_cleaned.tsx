import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './edit_message.css'
import { Message } from "./model";

interface MessageEditorProps {
    display: boolean
    enabled: boolean
    message: Message
    saveMessage: (messages: Message | undefined) => void
}

function MessageEditor (props: MessageEditorProps) {
    const [msgId, setMsgId] = useState(props.message.id)
    const [msgSubject, setMsgSubject] = useState(props.message.subject)
    const [msgContent, setMsgContent] = useState(props.message.content)

    const saveMessage = () => {
        const msg = new Message()
        msg.id = msgId
        msg.subject = msgSubject
        msg.content = msgContent
        props.saveMessage(msg)
    }

    const cancelMessage = () => {
        props.saveMessage(undefined)
    }

    useEffect( () => resetMessage(), [props])
    
    const resetMessage = () => {
        setMsgId(props.message.id)
        setMsgSubject(props.message.subject)
        setMsgContent(props.message.content)
    }

    return (
        <div className="message-editor">
            { !props.display && <div className="message-editor-subject">Message Editor: no message is selected for editing</div>}
            { props.display && <>
                <div className="message-editor-subject">Edit Message: {props.message.id} - {props.message.subject}</div>
                <Box component="form" 
                    sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}
                    noValidate
                    autoComplete="off">
                    <TextField id="msgId" label="Message ID" sx={{'& > :not(style)': {m: 1, textAlign: 'start', width: '30%'}}}
                        InputProps={{readOnly: true}}
                        InputLabelProps={{shrink: true}}
                        value={msgId} />
                    <TextField required id="msgSubject" label="Subject"
                        InputProps={{readOnly: !props.enabled}}
                        value={msgSubject}
                        onChange={e => setMsgSubject(e.target.value)} />
                    <TextField multiline id="msgContent" label="Subject" maxRows={6}
                        InputProps={{readOnly: !props.enabled}}
                        value={msgContent}
                        onChange={e => setMsgContent(e.target.value)} />
                </Box>
                <Stack spacing={2} direction="row" sx={{'marginTop': '30px', 'display' : 'block'}} textAlign={'right'}><div>
                        <Button variant="outlined" sx={{'margin': 0.5}} onClick={cancelMessage}>Cancel</Button>
                        <Button variant="outlined" sx={{'margin': 0.5}} onClick={resetMessage}>Reset</Button>
                        <Button variant="contained" sx={{'margin': 0.5}} onClick={saveMessage}>Save</Button>
                </div></Stack>
            </>}
        </div>
    )
}

export {MessageEditor}