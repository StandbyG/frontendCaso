

export class CheckRol {

    constructor() { }

    public isRolValidate(descriptionRol:string):boolean{
        let rol :any = JSON.parse(localStorage.getItem('menu')) ;
        let permited:boolean = false;
        

        for(let i=0; i<rol.accessRole.length && permited==false; i++ ){
            if(rol.accessRole[i].access.description == descriptionRol){
                permited = true;
            }
        }

        return permited;
    }

}
  
  