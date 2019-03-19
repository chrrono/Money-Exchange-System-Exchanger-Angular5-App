
export class WorkPlace{
    name : string;
    location : string;
    role : string;
    id : number;

    constructor(name : string, location : string, role : string, id : number){
        this.name = name;
        this.location = location;
        this.role = role;
        this.id = id;
    }
}