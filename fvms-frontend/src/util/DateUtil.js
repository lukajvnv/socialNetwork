import moment from "moment";
import strings from '../localization';

export function getYears(plusYears = 0) {

    let result = [];
    let currentYear = (new Date()).getFullYear();

    currentYear += plusYears;

    for(let i = currentYear; i >= currentYear - 99; i--) {

        result.push({
            name: i,
            value: i
        });
    }

    return result;
}

export function getMonths(){

    return [
        {id: 1, value: strings.months.jan},
        {id: 2, value: strings.months.feb},
        {id: 3, value: strings.months.mar},
        {id: 4, value: strings.months.apr},
        {id: 5, value: strings.months.may},
        {id: 6, value: strings.months.jun},
        {id: 7, value: strings.months.jul},
        {id: 8, value: strings.months.aug},
        {id: 9, value: strings.months.sep},
        {id: 10, value: strings.months.oct},
        {id: 11, value: strings.months.nov},
        {id: 12, value: strings.months.dec},
    ];
}

export function leapYear(year)
{
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export function stringToDate(date, format = 'DD-MM-YYYY') {
    return moment(date, format);
}

export function dateToString(date, format = 'DD-MM-YYYY') {
    return moment(date).format(format);
}

export function dateToStringDatePickerFormat(date, format = 'MM/DD/YYYY') {
    return moment(date).format(format);
}

export function dateTimeToString(date, format = 'DD-MM-YYYY HH:MM') {
    return moment(date).format(format);
}

export function splitDatePartFromString(date){
    return date ? date.split('T')[0] : '';
}

export function reformatDate(rawStringDate){
    if(rawStringDate){
        const date = new Date(splitDatePartFromString(rawStringDate))
        return dateToString(date);
    }
}