import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessagesItemComponent implements OnInit, OnDestroy {
  @Input() message:Message;
  messageSender :string;
  subscription: Subscription;

  constructor(private contactService: ContactService){ }
  
  ngOnInit(): void {
    let contact : Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name ?? "-";
    this.subscription = this.contactService.contactListChangedEvent.subscribe(()=>{
        contact = this.contactService.getContact(this.message.sender);
        this.messageSender = contact?.name ?? "-";
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
