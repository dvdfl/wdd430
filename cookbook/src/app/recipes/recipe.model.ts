export class Recipe {
    public id:string;
    public name:string;
    public description:string;
    public prep_time:number;
    public total_time:number;
    public servings:number;
    public meal_type:string;
    public imageUrl:string;
    public ingredients:Ingredient[];
    public prep_steps:{ step:number, description:string}[];
    
    constructor(id:string, name:string, description: string, prep_time:number, 
        total_time:number, servings:number, meal_type:string, 
        imageUrl:string, ingredients:Ingredient[], prep_steps:Step[]) 
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.prep_time = prep_time;
        this.total_time = total_time;
        this.servings = servings;
        this.meal_type = meal_type;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.prep_steps = prep_steps;
    }
}
export class Ingredient{
    public qty:number;
    public uom: string;
    public name:string;
    /**
     *
     */
    constructor(qty:number, uom:string, name:string){
        this.qty = qty;
        this.uom = uom;
        this.name = name;
    }
}

export class Step{
    public step:number;
    public description:string;

    constructor(step:number, description:string){
        this.step = step;
        this.description = description;
    }
}