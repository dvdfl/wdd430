import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('messageSubject', {static: true}) subject : ElementRef;
  @ViewChild('messageText', {static: true}) msgText : ElementRef;
  currentSender="David F";

  onSendMessage(){
      this.addMessageEvent.emit(new Message(1,this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender));
  }
  onClear(){
    this.subject.nativeElement.value=""; 
    this.msgText.nativeElement.value="";
  }
}
