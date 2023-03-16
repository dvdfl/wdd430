import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit,OnDestroy {
  contact: Contact;
  subscription: Subscription;

  constructor (private contactService: ContactService, 
    private router : Router, private route: ActivatedRoute ){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.contact = this.contactService.getContact(params['id']);
      if(this.contact == null){
        //if model isn't ready
        this.subscription = this.contactService.contactListChangedEvent.subscribe(()=>{
          this.contact = this.contactService.getContact(params['id']);
          }
        )

      }
    })
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(["/contacts"], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
