
import { NativeDateAdapter } from '@angular/material/core';

// TODO: Used to format the date of the datePicker component.
export class AppDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {

        if (displayFormat === 'input') {

            let day = (date.getUTCDate()).toString();

            let month = (date.getMonth() + 1).toString();
            const year = date.getFullYear();

            if(parseInt(day) <=9){
                day = '0'+ day;
            } 
            if(parseInt(month)<=9){
                month = '0'+ month;
            }
            
            return `${year}/${month}/${day}`;
        }

        return date.toDateString();
    }
}

export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
