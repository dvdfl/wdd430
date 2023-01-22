import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output('selectedFeatureEvent') selectedFeature = new EventEmitter<string>();
  
  onSelected(selectedEvent: string){
    this.selectedFeature.emit(selectedEvent);
  }
}
