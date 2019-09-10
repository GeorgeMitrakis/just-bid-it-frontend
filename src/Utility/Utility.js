import moment from 'moment';

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
}

export const getUserInfoField = (field) => {
    const userInfo = getUserInfo();
    if (userInfo)
    {
        return userInfo[field];
    }
    else
    {
        return null;
    }
}

export const createQueryParams = params => 
    Object.entries(params).map(kv => kv.map(encodeURIComponent).join("=")).join("&");


export const getQueryParams = (URLsearch) => {
    let queryParams = {};
    const query = new URLSearchParams(URLsearch);
    for (let param of query.entries()) {
        // console.log(param); 
        queryParams[param[0]] = param[1];
    }

    return queryParams;
}

export const todayIs = () => {
    return formatDate(new Date());
}

export const tomorrowIs = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return formatDate(date);
}

export const nextDayIs = (currDate) => {
    let date = new Date(currDate);
    date.setDate(date.getDate() + 1);
    return formatDate(date);
}

export const formatDate = (date) => {
    var d = new Date(date),
        minutes = '' + (d.getMinutes()),
        hours = '' + (d.getHours()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;

    let fulldate =  [year, month, day].join('-');
    let time = [hours, minutes].join(':');
    return fulldate+"T"+time;
}

export const isLegitDate = (input) => {
    return moment(input, 'YYYY-MM-DD', true).isValid(); 
}

export const cmpDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (d1.getTime() === d2.getTime())
    {
        return 0;
    }
    
    if (d1 < d2)
    {
        return -1;
    }
    else 
    {
        return 1;
    }

}