import { getLocaleNumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean =false;
  invalidDnd: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const contactId = params['id'];
      this.contact = this.contactService.getContact(contactId);
      if(contactId == null){
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(contactId);
      if(this.originalContact == null){
        return;
      }
      
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if(this.contact.group) {
        console.log("has group")
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    })
  }

  onCancel(){
    this.router.navigate(["/contacts"]);
  }

  onSubmit(form:NgForm){
    console.log("submitted");
    const value = form.value;
    // console.log(value);
    const newContact = new Contact(this.contact?.id ?? "", value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
    // console.log(newContact);
    if(this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else{
      this.contactService.addContact(newContact);
    }

    this.router.navigate(["/contacts"]);
  }
  
  addToGroup($event: any){
    // console.log($event);
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      this.invalidDnd = true
      return;
    }
    this.invalidDnd = false;
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    // console.log(`removing ${index}`)
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
    this.invalidDnd = false;
  }

  isInvalidContact(newContact: Contact) {
     if (!newContact) {// newContact has no value
       return true;
     }
     if (this.contact && newContact.id === this.contact.id) {
        return true;
     }
     for (let i = 0; i < this.groupContacts.length; i++){
        if (newContact.id === this.groupContacts[i].id) {
          return true;
        }
     }
     return false;
  }


}
