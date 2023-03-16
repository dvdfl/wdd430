import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
//const apiUrl = "https://contactsproject-b2023-default-rtdb.firebaseio.com/messages.json";
const apiUrl = "http://localhost:3000/messages/";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages : Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>()

  constructor(private httpClient: HttpClient) { 
    //this.messages = MOCKMESSAGES;
    this.messages = this.getMessages();
  }

  getMessages() : Message[] {
    this.httpClient.get<Message[]>(apiUrl).subscribe(docs=>{
      //console.log(docs);
      this.messages = docs;
      
      this.sortAndSend();
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
    if (!message) {
      return;
    }

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.httpClient.post<{message: string, newMessage: Message}>(apiUrl,
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.newMessage);
          this.sortAndSend();
        }
      );
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

  // storeMessages() {
  //   this.httpClient.put(apiUrl, JSON.stringify(this.messages)
  //   , { headers: new HttpHeaders({"Content-Type" : "application/json"})}).subscribe(()=>
  //     this.messageChangedEvent.next(this.messages.slice())
  //   )
  //  }

  sortAndSend(){
    this.messages.sort((a,b)=>{
      if (a.subject < b.subject) {
        return -1;
      }
      if (a.subject > b.subject) {
        return 1;
      }
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice())
  }
}
