import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
//const apiUrl = "https://contactsproject-b2023-default-rtdb.firebaseio.com/documents.json";
const apiUrl = "http://localhost:3000/documents/";

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  private documents : Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  //maxDocumentId :number;

  
  constructor(private httpClient: HttpClient) {
    this.documents = this.getDocuments();//MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId();
   }

  getDocuments() : Document[] {
    //map((docs:{[key:number]: Document}[])=>{
    this.httpClient.get<Document[]>(apiUrl).subscribe(docs=>{
      //console.log(docs);
      this.documents = docs;
      //this.maxDocumentId = this.getMaxId();
      this.sortAndSend();
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

  addDocument(document:Document){
      if (document == undefined || document == null) {
          return;
      }
      // make sure id of the new Document is empty
      document.id = '';

      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      // add to database
      this.httpClient.post<{ message: string, document: Document }>(apiUrl,
        document,
        { headers: headers })
        .subscribe(
          (responseData) => {
            // add new document to documents
            this.documents.push(responseData.document);
            this.sortAndSend(); 
          }
        );
  }

  updateDocument(originalDocument:Document,newDocument:Document){
    if (originalDocument == null || originalDocument == null || originalDocument == undefined || originalDocument == undefined){
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.httpClient.put(apiUrl + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

   deleteDocument(document:Document){
    if(!document){
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0){
      return;
    }
    // delete from database
    this.httpClient.delete(apiUrl + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  //  storeDocuments() {
  //   this.httpClient.put(apiUrl, JSON.stringify(this.documents)
  //   , { headers: new HttpHeaders({"Content-Type" : "application/json"})}).subscribe(()=>
  //     this.documentListChangedEvent.next(this.documents.slice())
  //   )
  //   , (error) => {
  //     console.error('Error saving documents: ', error);
  //   }
  //  }

  sortAndSend(){
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
  }
}
