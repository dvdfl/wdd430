import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documents : Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId :number;
  
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

  getDocuments() : Document[] {
    return this.documents.slice();
  }

  getDocument (id: string): Document {
    for (const document of this.documents) {
      if(document.id == id) {
         return document;
      }
    }
    return null;
  }

  addDocument(newDocument:Document){
      if (newDocument == undefined || newDocument == null) {
          return;
      }

      this.maxDocumentId++;
      newDocument.id = String(this.maxDocumentId);
      this.documents.push(newDocument)
      this.documentListChangedEvent.next(this.getDocuments())
  }
  updateDocument(originalDocument:Document,newDocument:Document){
    if (originalDocument == null || originalDocument == null || originalDocument == undefined || originalDocument == undefined){
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.getDocuments())
  }

   deleteDocument(document:Document){
    if(!document){
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0){
      return;
    }
    this.documents.splice(pos, 1);
    //this.documentChangedEvent.emit(this.documents.slice());
    this.documentListChangedEvent.next(this.getDocuments());

   }

   getMaxId():number{
    //return this.documents.sort(d=>d.id)[0];
    let maxId = 0
    for (const document of this.documents) {
      if(+document.id > maxId) {
        maxId = +document.id;
      }
    }
    return maxId;
   }
}
