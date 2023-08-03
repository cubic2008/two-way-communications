import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { EMPTY_MESSAGES, Message, MessageAction } from './model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input() messages: Message[] = []
  @Output() messageActionEvent = new EventEmitter<MessageAction>();
  currentMsgId: number = -1

  constructor() { }

  ngOnInit(): void {
    // for (let i = 1; i <= 3; i ++) {
    //   const msg = new Message()
    //   msg.id = i
    //   msg.subject = "Subject #" + i
    //   msg.content = "Content - " + i
    //   if (i === 2) {
    //     msg.subject = "Subject aaaaaa #" + i
    //   }
    //   this.messages.push(msg)
    // }
  }

  onMessageDelete (msgId: number) {
    console.log(`delete message - ${msgId}`)
    console.log('messages.length', this.messages.length)
    this.currentMsgId = -1
    this.messageActionEvent.emit({action: 'delete', messageId: msgId})
    // props.processMessage(msgId, 'delete')
    // // props.setCurrentMsgId(-1)
    // e.preventDefault()
  }

  onMessageEdit (msgId: number) {
    console.log(`edit message - ${msgId}`)
    this.currentMsgId = msgId
    this.messageActionEvent.emit({action: 'edit', messageId: msgId})
    // // props.setCurrentMsgId(msgId)
    // props.processMessage(msgId, 'edit')
    // e.preventDefault()
  }


}
