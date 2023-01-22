import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [new Message(1, "First", "Hello world!", "David F"),
  new Message(2, "Second", "This is the content of a message", "David F"),
  new Message(3, "Third", "Just saying hi", "David F"),
  new Message(4, "Fourth", "And testing with another message", "David F")];

  onAddMessage(message:Message) {
    this.messages.push(message);
  }
}
