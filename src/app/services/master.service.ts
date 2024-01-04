import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//Enviroments.
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

//RxJS.
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  
export class MasterService {

    constructor(private http: HttpClient) {

    }

    get token(): string {
        return localStorage.getItem('token') || '';
    }


    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    getMaster(){
        const url = `${base_url}/master`;

        return this.http.get(url, this.headers)
        .pipe(
            map((data :any) => {
              return {
                master: data.data
              };
            })
          )
    }

    updateMasterCode(id:number,name:string, address:string, country:string, telephone:string, tax:string, addressOp:string){
      const url = `${base_url}/master`;
      
      return this.http.put(url,{
        "idUserUpdate":id,
        "Name":name,
        "Address":address,
        "Country":country,
        "Telephone":telephone,
        "Tax":tax,
        "AddressOp":addressOp
      } , this.headers);
    }

}