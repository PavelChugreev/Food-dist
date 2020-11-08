function timer(id , deadline){

    function getTimeRemain(endTime){  // получаем остаток времени до конца акции
        const t = Date.parse(endTime) - Date.parse(new Date()); // остток времени в миллисек

        let days = Math.floor( t / (1000*60*60*24) ), // переводим милисек в дни
            hours = Math.floor( t / (1000*60*60) % 24 ),//в часы- делим без остатка ( 55 часов = 2 дня и 7 часов)
            minutes = Math.floor( t / (1000*60) % 60 ),
            seconds = Math.floor( t / 1000 % 60 );

        return{ //в результате фция выводит объек со значениями дней часов мин сек
            "total": endTime,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function setTime(selector, endTime){ // endtime - количество часов до дедлайна
        const timer = document.querySelector(selector),
              days = document.querySelector("#days"),
              hours = document.querySelector("#hours"),
              minutes = document.querySelector("#minutes"),
              seconds = document.querySelector("#seconds");
        
        const timeInterval = setInterval(updateTime, 1000);

        updateTime();// запускаем вначале чтобы сразу появилась новые цифры после обновл страницы
                    //если не запустить- обновиться только через 1 сек, тк строка 71
        function updateTime(){
            const remain  = getTimeRemain(endTime);// вернет объект с днями часами мин сек

            function addZero(num){ // ноль перед цифрами  < 10
                if(num >= 0 && num<10 ){
                    return `0${num}`;
                }else{
                    return num;
                }
            }

            if(remain.total <= 0){  // как только остаток времени акции дойдет до нуля
                clearInterval(timeInterval); // отсчет прекратиться
            }else{
                days.innerHTML = addZero(remain.days); // берем элементы на страницы
                hours.innerHTML = addZero(remain.hours); // и помещаем в них данные из объекта
                minutes.innerHTML = addZero(remain.minutes);
                seconds.innerHTML = addZero(remain.seconds);
            }
        }
    }

    setTime(id, deadline);
}

export default timer;