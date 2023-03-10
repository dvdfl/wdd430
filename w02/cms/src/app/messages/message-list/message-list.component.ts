import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  messages: Message[] = [];
  // messages: Message[] = [new Message(1, "First", "Hello world!", "David F"),
  // new Message(2, "Second", "This is the content of a message", "David F"),
  // new Message(3, "Third", "Just saying hi", "David F"),
  // new Message(4, "Fourth", "And testing with another message", "David F")];

  constructor(private messageService : MessageService){ }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages=>{
      this.messages = messages;
    }))
  }

  onAddMessage(message:Message) {
    this.messages.push(message);
  }
}
