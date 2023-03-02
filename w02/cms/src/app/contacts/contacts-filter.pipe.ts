import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  
  transform(contacts: Contact[], term: string): Contact[] {
    // initialize new array
    let filteredList: Contact[] = [];
    //filter items if term is valid
    if(term?.length > 0){
      filteredList = contacts.filter((contact)=>{
        return (contact.name.toLowerCase().includes(term.toLowerCase()));
      })
    }
    // if filtered list empty, return original list
    if(filteredList.length == 0){
      return contacts;
    }
    console.log(filteredList);
    //returning filtered list
    return filteredList;
  }

}
