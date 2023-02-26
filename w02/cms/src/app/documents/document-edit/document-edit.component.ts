import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument : Document;
  document :  Document;
  editMode : boolean = false;
  @ViewChild('f') editForm : NgForm;

  constructor(private documentService: DocumentService,
              private router : Router,
              private route : ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const docId = params['id'];
      if(docId == null){
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(docId);
      if(this.originalDocument == null){
        return;
      }
      this.editMode = true;
      console.log(this.originalDocument);
      //this.document = Object.assign({}, this.originalDocument);
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      console.log(this.document);
    })
  }

  onCancel(){
    this.router.navigate(["/documents"]);
  }
  onSubmit(form:NgForm){
    console.log("submitted");
    const value = form.value;
    // console.log(value);
    const newDocument = new Document(this.document?.id ?? "", value.name, value.description, value.url);
    // console.log(newDocument);
    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else{
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(["/documents"]);
  }
}
