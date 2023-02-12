import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
  
  documents : Document[] = [];
  constructor(private documentService: DocumentService){ }

  ngOnInit(): void {
    this.documents = this.documentService.documents.slice();
    this.documentService.documentChangedEvent.subscribe((docs)=>this.documents = docs)
  }
  
}
