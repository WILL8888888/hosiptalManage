// 获取右上角的时间戳
function timeShow(time) {
    let  newTime = "";
    let date = new Date(time);
    let a = new Array("日","一","二","三","四","五","六");
    let year: string = String(date.getFullYear()),
        month: string = String(date.getMonth()+1),//月份是从0开始
        day: string = String(date.getDate()),
        hour: string = String(date.getHours()),
        min: string = String(date.getMinutes()),
        sec: string = String(date.getSeconds()),
        week: string = String(new Date().getDay());
        if(Number(hour)<10){
          hour = "0"+hour;
        }
        if(Number(min)<10){
          min="0"+min;
        }
        if(Number(sec)<10){
          sec = "0"+sec;
        }
    newTime = year + "-"+month+"-" +day +"  星期"+a[week] + " "+hour+":"+min+":"+sec;
    return newTime;
  }


export {
  timeShow
}