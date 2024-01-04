import * as moment from 'moment';



const getMounths = () =>{
    return [
        {"name":"January", "value":"01"},
        {"name":"February", "value":"02"},
        {"name":"March", "value":"03"},
        {"name":"April", "value":"04"},
        {"name":"May", "value":"05"},
        {"name":"June", "value":"06"},
        {"name":"July", "value":"07"},
        {"name":"August", "value":"08"},
        {"name":"September", "value":"09"},
        {"name":"October", "value":"10"},
        {"name":"November", "value":"11"},
        {"name":"December", "value":"12"}
    ];

}

const getYears = () =>{
    let year = moment().format("YYYY");
    let years = [];

    for(let index =0;index<10;index++){
        let op = Number(year)+index;
        years.push( {"name":op, "value":op});
    }
    
    return years;

}

export {getMounths, getYears}