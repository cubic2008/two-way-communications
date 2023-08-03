import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Message, EMPTY_MESSAGES, MessageAction } from './model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {

  messages: Message[] = EMPTY_MESSAGES
  currentMsgId: number = -1
  currentMessage?: Message

  constructor() { }

  ngOnInit(): void {
  }

  addMessage () {
    const msg = new Message()
    msg.id = this.messages.map( msg => msg.id).reduce ( (p, v) => p > v ? p : v, 0) + 1
    msg.subject = "Subject #" + msg.id
    msg.content = "Body #" + msg.id
    // if (msg.id === 2) msg.subject += "aaaaaaaa"
    this.messages.push(msg)
    console.log("addMessage()", msg)
    
  }

  processMessage (messageAction: MessageAction) {
    console.log("processMessage", `action: ${messageAction.action} - ${messageAction.messageId}`)
    if (messageAction.action === 'delete') {
        this.messages = this.messages.filter( msg => msg.id !== messageAction.messageId)
        this.currentMsgId = -1
    } else { // 'edit'
      this.currentMsgId = messageAction.messageId
        this.currentMessage = this.messages.find(msg => msg.id === messageAction.messageId)

    }
  }

  saveMessage (msg?: Message) : void {
    if (msg) {
      console.log("saveMessage", msg)
      msg.timestamp = new Date()
      this.messages = this.messages.map(m => m.id === msg.id ? msg : m)
      this.currentMessage = msg
    } else {
      this.currentMsgId = -1
      this.currentMessage = undefined
    }
  }


}
