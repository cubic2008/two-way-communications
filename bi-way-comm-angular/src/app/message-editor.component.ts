import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import { Message } from './model';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.css']
})
export class MessageEditorComponent implements OnInit, OnChanges {

  // @Input() display: Boolean = true
  @Input() message?: Message
  @Output() messageSaveEvent = new EventEmitter<Message | undefined>();

  messageInProgress?: Message
  // private editorIsReady = false


  constructor() {
    console.log("MessageEditorComponent.constructor()", this.message)
  }

  ngOnInit(): void {
    // console.log("MessageEditorComponent.ngOnInit()", this.message)
    // if (this.message) {
    //   console.log("MessageEditorComponent.ngOnInit()", "received message")
    //   this.messageInProgress = this.message.clone()
    //   this.editorIsReady = true
    // }
  }

  ngOnChanges(): void {
    console.log("ngOnChanges.ngOnChanges()", this.message)
    if (this.message) {
      console.log("ngOnChanges.ngOnChanges()", "received message")
      this.messageInProgress = this.message.clone()
    } else {
      this.messageInProgress = undefined
    }
  }

  // canEdit() {
  //   return this.editorIsReady
  // }

  saveMessage () : void {
    this.messageSaveEvent.emit(this.messageInProgress)
  }

  cancelMessage () : void {
    this.messageSaveEvent.emit(undefined)
  }

  resetMessage () : void {
    if (this.message) {
      this.messageInProgress = this.message.clone()
    }
  }

}
