import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
//const apiUrl = "https://contactsproject-b2023-default-rtdb.firebaseio.com/contacts.json";
const apiUrl = "http://localhost:3000/contacts/";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private httpClient: HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.contacts = this.getContacts();
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {

    this.httpClient.get<Contact[]>(apiUrl).subscribe(docs => {
      //console.log(docs);
      this.contacts = docs;
      this.sortAndSend();
    });

    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id == id) {
        //console.log("found!")
        return contact;
      }
    }
    return null;
  }

  addContact(contact: Contact) {
    if (contact == undefined || contact == null) {
      return;
    }

    // make sure id of the new Document is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient.post<{ message: string, contact: Contact }>(apiUrl,
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == null || originalContact == null || originalContact == undefined || originalContact == undefined) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.httpClient.put(apiUrl + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.httpClient.delete(apiUrl + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
  

  getMaxId(): number {
    //return this.contacts.sort(d=>d.id)[0];
    let maxId = 0
    for (const contact of this.contacts) {
      if (+contact.id > maxId) {
        maxId = +contact.id;
      }
    }
    return maxId;
  }

  storeContacts() {
    this.httpClient.put(apiUrl, JSON.stringify(this.contacts)
      , { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe(
        {
          next: () => this.contactListChangedEvent.next(this.contacts.slice())
          , error: (e) => console.error('Error saving documents: ', e)
        }
      )
  }

  sortAndSend(){
    this.contacts.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice())
  }

}
