/**
 * 复制对象
 * @param obj
 * @return {object}
 */
function slightCopy(obj){
    var newObj = {};
    for(var i in obj){
        if(obj.hasOwnProperty(i))   // just for disable the warning from IDE, and this check is no necessary
            newObj[i] = obj[i];
    }
    return newObj;
}
