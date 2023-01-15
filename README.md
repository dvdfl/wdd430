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

Components are directives with templates

Structural directives, those that modify the DOM object, begin with *
`<p *ngIf="expressionOrProperty"></p>`

Marker reference (Local reference)
`<p *ngIf="expressionOrProperty; else noMessage">message</p>`
`<ng-template #noMessage>alternate message</ng-template>`

*Attribute directives don't add or remove, but change element they were placed on (no stast prefix)

ngStyle directive is attribute binding type, expects key:value object (should be used with backets beacuse it binds to a propery: style)
`<p [ngStyle]="{'background-color': method()}">` or `<p [ngStyle]="{ backgroundColor: method()}">`

ngClass directive 
`<p [ngClass]="className: ifExpressionistrue">`

ngFor (prefixed with the *)
`<ul><li *ngFor="let i of listProperty"></li></ul>`