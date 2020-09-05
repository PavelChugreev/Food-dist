window.addEventListener("DOMContentLoaded", () => {
    // Tabs
    const tabsContent = document.querySelectorAll(".tabcontent");
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabsWrapper = document.querySelector(".tabheader__items");

    function hideTabsContent(){
        tabsContent.forEach(item => {
            // item.style.display = "none";//через инлайн стили
            item.classList.add("hide");//через классы
            item.classList.remove("show", "fade");//через классы
        });
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTab(i = 0){ // i=0 если фция будет передаваться без аргумента, по умолч будет 0
        tabsContent.forEach(item => {
            // tabsContent[i].style.display = "block";
            tabsContent[i].classList.remove("hide");//через классы
            tabsContent[i].classList.add("show","fade"); // fade тип анимации из mycss.css
        });
        tabsContent.forEach(item => {
            tabs[i].classList.add("tabheader__item_active");
        });
    }

    hideTabsContent();
    showTab(0);

    tabsWrapper.addEventListener( "click", event => {
        const target = event.target; //нажатый элемент
        if ( target && target.classList.contains("tabheader__item")){ //если таргет содержит класс ""
            tabs.forEach((item,i) => { //тогда перебираем все табы(кнопки) и....
                if(target == item){ // евсли нажаты элемент совпадает с перебираемым табом тогда...
                    hideTabsContent(); // очищаем контент и..
                    showTab(i); //показываем контент под номером нажатого таба               
                }
            });
        }
    });

    // Timer
    const deadLine = "2020-09-15"; // дата окончания акции

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

    setTime(".timer", deadLine);

    // Modal window
    const openModalButtons = document.querySelectorAll("[data-modal]");
    const modalWindow = document.querySelector(".modal");
    // const closeModalWindowButton  = document.querySelector("[data-close]");

    function openModalWindow(){
        // modalWindow.style.display = "block";//или
        modalWindow.classList.add("show");
        modalWindow.classList.remove("hide");
        document.body.style.overflow = "hidden";// не прокручивает соержимое страницы при открытом модальном окне 
        clearInterval(modalWindowTimer);// мод окно не будет всплывать через N секундб если оно уже было вызвано
    }

    openModalButtons.forEach( item => {
        item.addEventListener("click", openModalWindow);
    });

    function closeModalWindow(){
        // modalWindow.style.display = "none"; // или
        modalWindow.classList.add("hide");
        modalWindow.classList.remove("show");
        document.body.style.overflow = "";//возвращает по умолчанию
    }

    // closeModalWindowButton.addEventListener("click", closeModalWindow);

    modalWindow.addEventListener("click", (e) => {
        if(e.target === modalWindow || e.target.getAttribute("data-close") == "" ){
            closeModalWindow();
        }
    });

    document.addEventListener("keydown", (e) => { //закртыие по нажатию ESC на клаве
        if( e.code === "Escape"  ){
            closeModalWindow();
        }
    });

    const modalWindowTimer = setTimeout(openModalWindow, 30000);

    function showModalByScroll(){ //вызов мод окна при прокрутки стр до конца
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            //прокрученная часть + высота видимой часть страницы >= всей высоты прокрутки
            openModalWindow();
            window.removeEventListener("scroll", showModalByScroll);//удаляем обработчик чтобы окно всплыло только 1 раз
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    //Menu Cards
    const menuField = document.querySelector(".menu__field .container");

    class TypeOfMenu {
        constructor (src, alt, title, text, price, ...classes){ // ...classes - rest operator
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes; //array
        }
        render(){
            const el = document.createElement("div");
            if (this.classes.length === 0){// если в функцию конструктор не будут переданы никакие классы( в качестве операторов),
                this.classes = "menu__item";// тогда ставим класс по умолчанию menu_item
                el.classList.add(this.classes);// и добавляем этот класс к созданному элементу
            }else{
                this.classes.forEach(className => el.classList.add(className));//каждоe название класса присваиваем элементу
            }
            el.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            menuField.append(el);
        }
    }

    const getResourse = async (url) => {
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getResourse("http://localhost:3000/menu")
        .then(data => {
            data.forEach( ({img, altimg, title, descr, price}) => {//деструктуризация объекта
                new TypeOfMenu(img, altimg, title, descr, price, ".menu .container").render();
            });
        });

    //Forms

    const forms = document.querySelectorAll("form");
    const message = {
        loading: "img/form/original.svg",
        success: "Done",
        failure: "Error"
    };

    forms.forEach( item => {
        bindData(item);
    });

    const postData = async (url, data) => {//async сообщает о синхронном коде
        const res = await fetch( url, { //await ставим перед действием которого необходимо дождаться
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });
        return await res.json();
    };

    function bindData(form){
        form.addEventListener("submit", (e) => { //обработчик по нажатию кнопки подтверждения отправки формы
            e.preventDefault();

            let statusMessage = document.createElement("img");
            statusMessage.classList.add("spinner");
            statusMessage.src = message.loading;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);// конструктор введенных данных из формы
            const json = JSON.stringify(Object.fromEntries(formData.entries()));//formData.entries превращение 
            //formData в массив массивов //Object.fromEntries переводим ее в классический объект, и потом в формат JSON
            
            postData("http://localhost:3000/requests", json)
            .then(data => { //data вернул сервер
                console.log(data);
                showThanksModalWindow(message.success);
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            }).catch(() => {
                console.log("error");
                showThanksModalWindow(message.failure);
            }).finally( () => {
                form.reset();
            });
        });
    }

    function showThanksModalWindow(message){
        const prevModal = document.querySelector(".modal__dialog");
        prevModal.classList.add("hide");
        openModalWindow();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector(".modal").append(thanksModal);
        setTimeout( () => {
            thanksModal.remove();
            prevModal.classList.remove("hide");
            prevModal.classList.add("show");
            closeModalWindow();
        },2000);
    }

    // Slider
    const prev = document.querySelector(".offer__slider-prev");
    const next = document.querySelector(".offer__slider-next");
    let current = document.querySelector("#current");
    let total = document.querySelector("#total");
    const slides = document.querySelectorAll(".offer__slide");
    let slideIndex = 0;

    showSlide();

    function showSlide(){
        if(slideIndex < 0){
            slideIndex = slides.length-1;
        }
        
        if(slideIndex > slides.length-1){
            slideIndex = 0;
        }

        if(slides.length<10){
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex + 1}`;
        }else{
            total.textContent = slides.length;
            current.textContent = slideIndex + 1;
        }

        slides.forEach(slide => {
            slide.classList.add("hide");
        });

        slides[slideIndex].classList.add("show");
        slides[slideIndex].classList.remove("hide");
    }
    
    prev.addEventListener("click", () => {
        slideIndex--;
        showSlide();
    });

    next.addEventListener("click", () => {
        slideIndex++;
        showSlide();
    });
});