import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  documents : Document[] = [
    new Document("1", "Summary", "Contains a summary of  lesson # 4", "https://duckduckgo.com/?q=Summary", null),
    new Document("2", "Homework", "homework information of lesson # 4", "https://duckduckgo.com/?q=Homework", null),
    new Document("3", "CSE341-Lesson 4: API Documentation", "The most recent version of my resume document", "https://cse341.netlify.app/lesson4", null),
    new Document("4", "CSE341 - Project Requirements", "Essay homework of lesson # 4", "https://cse341.netlify.app/projects/1", null),
    new Document("5", "Study Guide", "First 4 units study guide", "https://duckduckgo.com/?q=Study+Guide", null)
  ];

  onSelectedDocument(document:Document){
    //console.log(document)
    this.selectedDocumentEvent.emit(document);
  }
}
