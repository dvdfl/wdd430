import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts : Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId :number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() : Contact[] {
    return this.contacts.slice();
  }
  
  getContact(id: string) : Contact{
    for (const contact of this.contacts) {
      if(contact.id == id) {
        console.log("found!")
         return contact;
      }
    }
    return null;
  }

  addContact(newContact:Contact){
      if (newContact == undefined || newContact == null) {
          return;
      }

      this.maxContactId++;
      newContact.id = String(this.maxContactId);
      this.contacts.push(newContact)
      this.contactListChangedEvent.next(this.getContacts())
  }
  updateContact(originalContact:Contact,newContact:Contact){
    if (originalContact == null || originalContact == null || originalContact == undefined || originalContact == undefined){
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0){
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactListChangedEvent.next(this.getContacts())
  }

  deleteContact(contact: Contact) { 
    if(!contact){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if(pos <0){
      return;
    }
    this.contacts.splice(pos, 1);
    //this.contactChangedEvent.emit(this.contacts.slice());
    this.contactListChangedEvent.next(this.getContacts());

  }

  getMaxId():number{
    //return this.contacts.sort(d=>d.id)[0];
    let maxId = 0
    for (const contact of this.contacts) {
      if(+contact.id > maxId) {
        maxId = +contact.id;
      }
    }
    return maxId;
   }

}
