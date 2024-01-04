

import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class DateService {

    getDateFormatt(date: string): any {
        let arrayDate = date.split('/');
        let dateFormat = null;

        if( parseInt(arrayDate[0]) <= 9 ){
            arrayDate[0] = '0' + arrayDate[0] 
        }

        if( parseInt(arrayDate[1]) <= 9){
            arrayDate[1] = '0' + arrayDate[1] 
        }

        
        dateFormat = {
            "date": arrayDate[2] + '/' + arrayDate[1] + '/' + arrayDate[0],
            "startDate": arrayDate[2] + '/' + arrayDate[1] + '/' + arrayDate[0] + ' 00:00:00',
            "endDate": arrayDate[2] + '/' + arrayDate[1] + '/' + arrayDate[0] + ' 24:00:00'
        }
        
        return dateFormat;
    }


    convertDate(date: string): any { // Format : YYYY-MM-dd H:m:s
        let arrayDate = date.split('/');
        let dateFormat = null;

        if( parseInt(arrayDate[0]) <= 9 ){
            arrayDate[0] = '0' + arrayDate[0] 
        }

        if( parseInt(arrayDate[1]) <= 9){
            arrayDate[1] = '0' + arrayDate[1] 
        }

        dateFormat = arrayDate[2].slice(0,4) + "-" + arrayDate[1] + "-" + arrayDate[0] + " " + arrayDate[2].slice(5);
        
        
        return dateFormat;
    }
}