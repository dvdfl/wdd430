# wdd430
wdd430 - Web Full-Stack Development class repository

---
## Notes

### Week 1

Commands list

Angular CLI install command (`-g` for global installation, `@latest` for latest version) 
`npm install -g @angular/cli@latest`

Create new Angular project (`--no-strict` disables sctrict mode https://angular.io/guide/strict-mode)
`ng new my-project --no-strict` 

Express install comand
`npm install express`

Bootstrap install command
`npm install --save bootstrap@3` 

Run Angular Application command
`ng serve` 


Check execution Policy for Node
`Get-ExecutionPolicy -list`

Generate a plain old package.json using legacy init (`create` is an alias, `-y` no questions asked):
`npm create` or `npm init`


### Week 2

### commands
Create new component (`--skip-tests true` paramenter will exclude spec testing file )
`ng generate component my-component` or `ng g c my-component`

Create new component inside existing compoent folder
`ng generate component my-component/my-subcomp` or `ng g c my-component/my-subcomp`


String interpolation syntax 
`{{ expressionOrcomponentProperty }}`

Attribute binding
`<p [domAttribute]="expressionOrcomponentProperty"> </p>`

Event Binding for button click
`<button (click)="componentMethod()">`

Event Binding for textbox input
`<input type="text" (input)="componentMethod($event)">`

Model Binding for textbox input
`<input type="text" [(ngModel)]="componentProperty">`

##@ Directives

Components are directives with templates \

Structural directives, those that modify the DOM object, begin with * \
`<p *ngIf="expressionOrProperty"></p>`

Marker reference (Local reference) \
`<p *ngIf="expressionOrProperty; else noMessage">message</p>`
`<ng-template #noMessage>alternate message</ng-template>`

Local Reference in Component class (TypeScript) \
`<inpu type="text" #messageSubject >`
`  @ViewChild('messageSubject', {static: true}) subject : ElementRef; `


*Attribute directives don't add or remove, but change element they were placed on (no stast prefix)

ngStyle directive is attribute binding type, expects key:value object (should be used with backets beacuse it binds to a propery: style)\
`<p [ngStyle]="{'background-color': method()}">` or `<p [ngStyle]="{ backgroundColor: method()}">`

ngClass directive \
`<p [ngClass]="className: ifExpressionistrue">`

ngFor (prefixed with the *)\
`<ul><li *ngFor="let i of listProperty"></li></ul>`

## Week 3

### Sharing data between child and parent directives and components

Share Component property with @Output decorator \
`@Input('message') messageText : string;` \
on parent component: \
`<app-component [message]="valueOrExpression">`

Event Emmiter to share value to notify parent component of a change: \
`@Output() sendMessageEvent = new EventEmitter<string>(); ` \
Child component method:
```
  onSendMessage(){
      this.addMessageEvent.emit(this.messageText.nativeElement.value);
  }
```
On parent Component \
`<app-component (sendMessageEvent)="parentMethod($event)">`


## Week 3

Attribute directive `ngClass` \
`<li [ngClass]="{ className: index >0 }">`

Attribute directive `ngStyle` \
`<li [ngStyle]="{ backgroundColor: index>0 ?' black' : 'red'}">`

Custom Attribute directive \
'''
file name: highlight-directive.ts

@Directive({
    selector: '[appHighligh]'
})

export class HighlightDirective {
    
    // can be injected
    constructor (private elementRef: ElementRef, private renderer: Renderer2) implements OnInit {

    }
    ngOnInit() {
        // set style of the element
        this.renderer.setStyle(this.elementRef.nativeElement, 'backbround-color', 'blue')
    }

    // additionally can listen to events
    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'backbround-color', 'green');

        // if HostBinding used
        this.backgroundColor = 'green';
    }
    @HostListener('mouseleave') mousleave(eventData: Event) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'backbround-color', 'yellow')
        
        // if HostBinding used
        this.backgroundColor = 'yellow'; 
        // if color are properies 
        this.backgroundColor = this.highlightColor; 
    }


    // properties can be bound directly like DOM property with HostBinding
    @HostBinding('stye.backgroundColor') backgroundColor : string = 'red';

    // Colors can be properties, alias can be used but the value will be from attraibute [appHighligh]="'red'"
    @Input() defaultColor : string = 'transparent';
    @Input() highlightColor : string = 'blue';
    
}

// Directive properties can be bound directly as attributes
<p appHighligh [defaultColor]="'red'" [highlightColor]="'blue'">
or
<p appHighligh defaultColor="red" highlightColor="blue">
'''

Custom Structural directive
```
@Directive({
    selector: '[appUnless]'
})
export class UnlessDirective {
    //name needs to match property name
    @Input set appUnless(condition :boolean)
    {
        if(!condition){
            this.viewContainerRef.createEmbeddedVierw(this.templateRef);
        } else {
            this.viewContainerRef.clear()
        }
    }

    // ViewContainerRef is the place where the template will be rendered
    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef){

    }
}
//usage
<div *appUnless="!onlyOdd"></div>
```

## Week 6
### Routing

HTML links use `routeLink` attribute and `routerLinkActiveOptions` sets the CSS class name to the element when route matches, and optional `routerLinkActiveOptions` prevent applying to subroutes
```
<li routerLinkActive="cssClassActive" [routerLinkActiveOptions]="{ exact: true }">
  <a routeLink="/routename">Link name</a>
</li>
```