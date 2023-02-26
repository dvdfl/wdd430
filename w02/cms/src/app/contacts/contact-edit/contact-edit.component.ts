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
}
