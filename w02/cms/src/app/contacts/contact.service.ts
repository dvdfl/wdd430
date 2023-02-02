import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts : Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  
  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts() : Contact[] {
    return this.contacts.slice();
  }
  
  getContact(id: string) : Contact{
    this.contacts.forEach(contact => {
      if(contact.id == id) {
         return contact;
      }
    })
    return null;
  }
}
