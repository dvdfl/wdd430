import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import {Document} from '../document.model';
import { WindRefService } from 'src/app/wind-ref.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;
  constructor(private documentService: DocumentService, 
    private router : Router, private route : ActivatedRoute,
    private windRefService: WindRefService ) {

  }
  ngOnInit(): void {
    // let docId = this.route.snapshot.params['id'];
    // this.document = this.documentService.getDocument(docId);
    // console.log(this.document);
    this.nativeWindow = this.windRefService.getNativeWindow();
    this.route.params.subscribe(
      (params)=>{
        let docId = params['id'];
        this.document = this.documentService.getDocument(docId);
        //console.log(this.document);
      }
    )
  }
  onView(){
    this.nativeWindow.open(this.document.url);
  }
  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(["/documents"]);
  }
}
