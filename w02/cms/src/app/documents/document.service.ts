import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
const apiUrl = "https://contactsproject-b2023-default-rtdb.firebaseio.com/documents.json";

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  private documents : Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId :number;

  
  constructor(private httpCient: HttpClient) {
    this.documents = this.getDocuments();//MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

  getDocuments() : Document[] {
    //map((docs:{[key:number]: Document}[])=>{
    this.httpCient.get<Document[]>(apiUrl).subscribe(docs=>{
      //console.log(docs);
      this.documents = docs;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a,b)=>{
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.documentListChangedEvent.next(this.documents.slice())
    });
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
      console.log("adding document..")
      this.maxDocumentId++;
      newDocument.id = String(this.maxDocumentId);
      this.documents.push(newDocument)
      //this.documentListChangedEvent.next(this.documents.slice())
      this.storeDocuments();
  }

  updateDocument(originalDocument:Document,newDocument:Document){
    if (originalDocument == null || originalDocument == null || originalDocument == undefined || originalDocument == undefined){
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }
    // console.log("updating document.. [old-new]")
    newDocument.id = originalDocument.id;
    // console.log(originalDocument)
    // console.log(newDocument)
    this.documents[pos] = newDocument;
    
    //this.documentListChangedEvent.next(this.documents.slice())
    this.storeDocuments();
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
    //this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
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

   storeDocuments() {
    this.httpCient.put(apiUrl, JSON.stringify(this.documents)
    , { headers: new HttpHeaders({"Content-Type" : "application/json"})}).subscribe(()=>
      this.documentListChangedEvent.next(this.documents.slice())
    )
    , (error) => {
      console.error('Error saving documents: ', error);
    }
   }
}
