import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
const apiUrl = "https://contactsproject-b2023-default-rtdb.firebaseio.com/messages.json";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages : Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>()

  constructor(private httpCient: HttpClient) { 
    //this.messages = MOCKMESSAGES;
    this.messages = this.getMessages();
  }

  getMessages() : Message[] {
    this.httpCient.get<Message[]>(apiUrl).subscribe(docs=>{
      //console.log(docs);
      this.messages = docs;
      
      this.messages.sort((a,b)=>{
        if (a.subject < b.subject) {
          return -1;
        }
        if (a.subject > b.subject) {
          return 1;
        }
        return 0;
      });
      
      return this.messageChangedEvent.next(this.messages.slice());
    });
    return this.messages.slice();
  }

  getMessage(id: string) : Message {
    for (const message of this.messages) {
      if(message.id == id) {
         return message;
      }
    }
    return null;
  }
  
  addMessage(message :Message) {
    this.messages.push(message);
    //this.messageChangedEvent.emit(this.getMessages());
    this.storeMessages();
  }

  getMaxId():number{
    //return this.messages.sort(d=>d.id)[0];
    let maxId = 0
    for (const message of this.messages) {
      if(+message.id > maxId) {
        maxId = +message.id;
      }
    }
    return maxId;
   }

  storeMessages() {
    this.httpCient.put(apiUrl, JSON.stringify(this.messages)
    , { headers: new HttpHeaders({"Content-Type" : "application/json"})}).subscribe(()=>
      this.messageChangedEvent.next(this.messages.slice())
    )
   }
}
