/**
 *时间戳转化成日期时间，兼容所有浏览器
 * @param unixTime
 * @returns {string|*}
 */
function timstampToDate( unixTime ) {
    var now = new Date(parseInt(unixTime) * 1000);
    var   year=now.getFullYear();
    var   month=now.getMonth()+1;
    var   date=now.getDate();
    var   hour=addZero(now.getHours());
    var   minute=addZero(now.getMinutes());
    var   second=addZero(now.getSeconds());
    return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

/**
 * 时间单位小于10补0
 * @param item
 * @return {string}
 */
function addZero(item){
    if(parseInt(item) < 10){
        return '0'+item;
    }
    return item;
}
