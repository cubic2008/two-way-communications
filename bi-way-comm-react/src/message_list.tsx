import { useState } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import './message_list.css'
import { Message } from "./model";

interface MessageListProps {
    messages: Message[]
    currentMessageId: number
    setCurrentMsgId: (msgId: number) => void
    processMessage: (msgId: number, action: string) => void
}

function MessageList (props: MessageListProps) {
    const [messages, setMessages] = useState([])
    // const [currentMsgId, setCurrentMsgId] = useState(-1)

    // const handleMessage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, msgId: number) => {
    //   console.log("Msg clicked", msgId)
    //   e.preventDefault()
    // }

    const handleMessageDeletion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, msgId: number) => {
      console.log(`${msgId} 2nd action - deletion`)
      props.processMessage(msgId, 'delete')
      // props.setCurrentMsgId(-1)
      e.preventDefault()
    }

    const handleMessageEdition = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, msgId: number) => {
      console.log(`${msgId} 2nd action - edition`)
      // props.setCurrentMsgId(msgId)
      props.processMessage(msgId, 'edit')
      e.preventDefault()
    }

    return (
        <List>
          {props.messages.length <= 0 && 
            <div className="message-list-subject">No messages</div>
          }

          {props.messages.length > 0 && 
            props.messages.map( msg => 
                <ListItem 
                  // onClick={e => handleMessage(e, msg.id)}
                  key={msg.id}
                  className="message-item"
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={e => handleMessageEdition(e, msg.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={e => handleMessageDeletion(e, msg.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }>
                  <ListItemAvatar>
                    <Avatar>
                      { props.currentMessageId !== msg.id && <EmailIcon />}
                      { props.currentMessageId === msg.id && <EmailOutlinedIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    {msg.subject}
                  </ListItemText>
                </ListItem>
              )
          }
        </List>
    )
}

export {MessageList}