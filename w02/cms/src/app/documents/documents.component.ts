import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument : Document;

  constructor(private documentservice :DocumentService){ }
  
  ngOnInit(): void {
    this.documentservice.documentSelectedEvent.subscribe((documewnt:Document)=>{
      this.selectedDocument = documewnt;
      console.log("new subscribe")
    });
  }
}
