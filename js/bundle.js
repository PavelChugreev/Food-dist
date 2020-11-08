/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 103:0-14 */
/***/ ((module) => {

function calc(){
    const result = document.querySelector(".calculating__result span");
    let sex,weight, height, age, ratio;

    if(localStorage.getItem("sex")){
        sex = localStorage.getItem("sex");
    }else{
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if(localStorage.getItem("ratio")){
        ratio = localStorage.getItem("ratio");
    }else{
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach( el => {
            el.classList.remove(activeClass);

            if(el.getAttribute("id") === localStorage.getItem("sex")){
                el.classList.add(activeClass);
            }
            if(el.getAttribute("data-ratio") === localStorage.getItem("ratio")){
                el.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div","calculating__choose-item_active");

    function calcResult(){
        if(!sex || !weight || !height || !age || !ratio){
            result.textContent = "___";
            console.log(sex, weight, height, age, ratio);
            return;
        }

        if(sex === "female"){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcResult();

    function getStaticInfo(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach( el => {
            el.addEventListener("click", (e) => {
                if(e.target.getAttribute("data-ratio")){
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", +e.target.getAttribute('data-ratio'));
                }else{
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute('id'));
                }

                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcResult();
            });
        });
    }

    getStaticInfo("#gender div", "calculating__choose-item_active");
    getStaticInfo(".calculating__choose_big div","calculating__choose-item_active");

    function getDynamicInfo(selector){
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {

            if(input.value.match(/\D/g)){
                input.style.border = "1px solid red";
            }else{
                input.style.border = "none";
            }

            switch(input.getAttribute("id")){
                case "height" : height = +input.value;
                break;
                case "weight" : weight = +input.value;
                break;
                case "age" : age = +input.value;
                break;
            }
            calcResult();
        });
    }
    getDynamicInfo("#height");
    getDynamicInfo("#weight");
    getDynamicInfo("#age");
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 52:0-14 */
/***/ ((module) => {

function cards(){
    const menuField = document.querySelector(".menu__field .container");

    class TypeOfMenu {
        constructor (src, alt, title, text, price, parentSelector, ...classes){ // ...classes - rest operator
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
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
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 76:0-14 */
/***/ ((module) => {

function forms(){
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
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 52:0-14 */
/***/ ((module) => {

function modal(){
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
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 106:0-14 */
/***/ ((module) => {

function slider(){
    const prev = document.querySelector(".offer__slider-prev");
    const next = document.querySelector(".offer__slider-next");
    let current = document.querySelector("#current");
    let total = document.querySelector("#total");
    const slides = document.querySelectorAll(".offer__slide");
    const slidesWrapper = document.querySelector(".offer__slider-wrapper");
    const slidesField = document.querySelector(".offer__slider-inner");
    const width = window.getComputedStyle(slidesWrapper).width;// значение ширины из css
    let slideIndex = 1;
    let offset = 0;

    if(slides.length<10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });

        //slider navi
    const slider = document.querySelector(".offer__slider");
    const indicators = document.createElement("ol");
    const dots =[];

    slider.style.position = "relative";
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i+1);
        dot .classList.add("dot");
        if(i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }  //slider navi

    function changeCurrent(){
        if(slides.length<10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    }

    function setOffset(){
        if(offset == +width.replace(/\D/g, "") * (slides.length -1)){// "500 px"
            offset = 0;
        }else{
            offset += +width.replace(/\D/g, "");
        }
    }

    next.addEventListener("click", () =>{
        setOffset();

        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }

        changeCurrent();
    });

    prev.addEventListener("click", () =>{
        setOffset();

        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == 1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }

        changeCurrent();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (event) => {
            const slideTo = event.target.getAttribute("data-slide-to");
            slideIndex = slideTo;
            offset = +width.replace(/\D/g, "") * (slideTo-1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            changeCurrent();
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 44:0-14 */
/***/ ((module) => {

function tabs(){
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
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 57:0-14 */
/***/ ((module) => {

function timer(){
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
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
window.addEventListener("DOMContentLoaded", () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
    
    tabs();
    modal();
    timer();
    slider();
    forms();
    cards();
    calc();


    // Tabs
    // const tabsContent = document.querySelectorAll(".tabcontent");
    // const tabs = document.querySelectorAll(".tabheader__item");
    // const tabsWrapper = document.querySelector(".tabheader__items");

    // function hideTabsContent(){
    //     tabsContent.forEach(item => {
    //         // item.style.display = "none";//через инлайн стили
    //         item.classList.add("hide");//через классы
    //         item.classList.remove("show", "fade");//через классы
    //     });
    //     tabs.forEach(item => {
    //         item.classList.remove("tabheader__item_active");
    //     });
    // }

    // function showTab(i = 0){ // i=0 если фция будет передаваться без аргумента, по умолч будет 0
    //     tabsContent.forEach(item => {
    //         // tabsContent[i].style.display = "block";
    //         tabsContent[i].classList.remove("hide");//через классы
    //         tabsContent[i].classList.add("show","fade"); // fade тип анимации из mycss.css
    //     });
    //     tabsContent.forEach(item => {
    //         tabs[i].classList.add("tabheader__item_active");
    //     });
    // }

    // hideTabsContent();
    // showTab(0);

    // tabsWrapper.addEventListener( "click", event => {
    //     const target = event.target; //нажатый элемент
    //     if ( target && target.classList.contains("tabheader__item")){ //если таргет содержит класс ""
    //         tabs.forEach((item,i) => { //тогда перебираем все табы(кнопки) и....
    //             if(target == item){ // евсли нажаты элемент совпадает с перебираемым табом тогда...
    //                 hideTabsContent(); // очищаем контент и..
    //                 showTab(i); //показываем контент под номером нажатого таба               
    //             }
    //         });
    //     }
    // });

    // Timer
    // const deadLine = "2020-09-15"; // дата окончания акции

    // function getTimeRemain(endTime){  // получаем остаток времени до конца акции
    //     const t = Date.parse(endTime) - Date.parse(new Date()); // остток времени в миллисек

    //     let days = Math.floor( t / (1000*60*60*24) ), // переводим милисек в дни
    //         hours = Math.floor( t / (1000*60*60) % 24 ),//в часы- делим без остатка ( 55 часов = 2 дня и 7 часов)
    //         minutes = Math.floor( t / (1000*60) % 60 ),
    //         seconds = Math.floor( t / 1000 % 60 );

    //     return{ //в результате фция выводит объек со значениями дней часов мин сек
    //         "total": endTime,
    //         "days": days,
    //         "hours": hours,
    //         "minutes": minutes,
    //         "seconds": seconds
    //     };
    // }

    // function setTime(selector, endTime){ // endtime - количество часов до дедлайна
    //     const timer = document.querySelector(selector),
    //           days = document.querySelector("#days"),
    //           hours = document.querySelector("#hours"),
    //           minutes = document.querySelector("#minutes"),
    //           seconds = document.querySelector("#seconds");
        
    //     const timeInterval = setInterval(updateTime, 1000);

    //     updateTime();// запускаем вначале чтобы сразу появилась новые цифры после обновл страницы
    //                 //если не запустить- обновиться только через 1 сек, тк строка 71
    //     function updateTime(){
    //         const remain  = getTimeRemain(endTime);// вернет объект с днями часами мин сек

    //         function addZero(num){ // ноль перед цифрами  < 10
    //             if(num >= 0 && num<10 ){
    //                 return `0${num}`;
    //             }else{
    //                 return num;
    //             }
    //         }

    //         if(remain.total <= 0){  // как только остаток времени акции дойдет до нуля
    //             clearInterval(timeInterval); // отсчет прекратиться
    //         }else{
    //             days.innerHTML = addZero(remain.days); // берем элементы на страницы
    //             hours.innerHTML = addZero(remain.hours); // и помещаем в них данные из объекта
    //             minutes.innerHTML = addZero(remain.minutes);
    //             seconds.innerHTML = addZero(remain.seconds);
    //         }
    //     }
    // }

    // setTime(".timer", deadLine);

    // Modal window
    // const openModalButtons = document.querySelectorAll("[data-modal]");
    // const modalWindow = document.querySelector(".modal");
    // // const closeModalWindowButton  = document.querySelector("[data-close]");

    // function openModalWindow(){
    //     // modalWindow.style.display = "block";//или
    //     modalWindow.classList.add("show");
    //     modalWindow.classList.remove("hide");
    //     document.body.style.overflow = "hidden";// не прокручивает соержимое страницы при открытом модальном окне 
    //     clearInterval(modalWindowTimer);// мод окно не будет всплывать через N секундб если оно уже было вызвано
    // }

    // openModalButtons.forEach( item => {
    //     item.addEventListener("click", openModalWindow);
    // });

    // function closeModalWindow(){
    //     // modalWindow.style.display = "none"; // или
    //     modalWindow.classList.add("hide");
    //     modalWindow.classList.remove("show");
    //     document.body.style.overflow = "";//возвращает по умолчанию
    // }

    // // closeModalWindowButton.addEventListener("click", closeModalWindow);

    // modalWindow.addEventListener("click", (e) => {
    //     if(e.target === modalWindow || e.target.getAttribute("data-close") == "" ){
    //         closeModalWindow();
    //     }
    // });

    // document.addEventListener("keydown", (e) => { //закртыие по нажатию ESC на клаве
    //     if( e.code === "Escape"  ){
    //         closeModalWindow();
    //     }
    // });

    // const modalWindowTimer = setTimeout(openModalWindow, 30000);

    // function showModalByScroll(){ //вызов мод окна при прокрутки стр до конца
    //     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
    //         //прокрученная часть + высота видимой часть страницы >= всей высоты прокрутки
    //         openModalWindow();
    //         window.removeEventListener("scroll", showModalByScroll);//удаляем обработчик чтобы окно всплыло только 1 раз
    //     }
    // }

    // window.addEventListener("scroll", showModalByScroll);

    //Menu Cards
    // const menuField = document.querySelector(".menu__field .container");

    // class TypeOfMenu {
    //     constructor (src, alt, title, text, price, parentSelector, ...classes){ // ...classes - rest operator
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.text = text;
    //         this.price = price;
    //         this.parent = document.querySelector(parentSelector);
    //         this.classes = classes; //array
    //     }
    //     render(){
    //         const el = document.createElement("div");
    //         if (this.classes.length === 0){// если в функцию конструктор не будут переданы никакие классы( в качестве операторов),
    //             this.classes = "menu__item";// тогда ставим класс по умолчанию menu_item
    //             el.classList.add(this.classes);// и добавляем этот класс к созданному элементу
    //         }else{
    //             this.classes.forEach(className => el.classList.add(className));//каждоe название класса присваиваем элементу
    //         }
    //         el.innerHTML = `
    //             <img src=${this.src} alt=${this.alt}>
    //             <h3 class="menu__item-subtitle">${this.title}</h3>
    //             <div class="menu__item-descr">${this.text}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //             </div>
    //         `;
    //         menuField.append(el);
    //     }
    // }

    // const getResourse = async (url) => {
    //     const res = await fetch(url);
    //     if(!res.ok){
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // };

    // getResourse("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach( ({img, altimg, title, descr, price}) => {//деструктуризация объекта
    //             new TypeOfMenu(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

    //Forms

    // const forms = document.querySelectorAll("form");
    // const message = {
    //     loading: "img/form/original.svg",
    //     success: "Done",
    //     failure: "Error"
    // };

    // forms.forEach( item => {
    //     bindData(item);
    // });

    // const postData = async (url, data) => {//async сообщает о синхронном коде
    //     const res = await fetch( url, { //await ставим перед действием которого необходимо дождаться
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: data
    //     });
    //     return await res.json();
    // };

    // function bindData(form){
    //     form.addEventListener("submit", (e) => { //обработчик по нажатию кнопки подтверждения отправки формы
    //         e.preventDefault();

    //         let statusMessage = document.createElement("img");
    //         statusMessage.classList.add("spinner");
    //         statusMessage.src = message.loading;
    //         form.insertAdjacentElement("afterend", statusMessage);

    //         const formData = new FormData(form);// конструктор введенных данных из формы
    //         const json = JSON.stringify(Object.fromEntries(formData.entries()));//formData.entries превращение 
    //         //formData в массив массивов //Object.fromEntries переводим ее в классический объект, и потом в формат JSON
            
    //         postData("http://localhost:3000/requests", json)
    //         .then(data => { //data вернул сервер
    //             console.log(data);
    //             showThanksModalWindow(message.success);
    //             setTimeout(() => {
    //                 statusMessage.remove();
    //             }, 2000);
    //         }).catch(() => {
    //             console.log("error");
    //             showThanksModalWindow(message.failure);
    //         }).finally( () => {
    //             form.reset();
    //         });
    //     });
    // }

    // function showThanksModalWindow(message){
    //     const prevModal = document.querySelector(".modal__dialog");
    //     prevModal.classList.add("hide");
    //     openModalWindow();

    //     const thanksModal = document.createElement("div");
    //     thanksModal.classList.add("modal__dialog");
    //     thanksModal.innerHTML = `
    //         <div class="modal__content">
    //             <div data-close class="modal__close">&times;</div>
    //             <div class="modal__title">${message}</div>
    //         </div>
    //     `;
    //     document.querySelector(".modal").append(thanksModal);
    //     setTimeout( () => {
    //         thanksModal.remove();
    //         prevModal.classList.remove("hide");
    //         prevModal.classList.add("show");
    //         closeModalWindow();
    //     },2000);
    // }

    // Slider
    // const prev = document.querySelector(".offer__slider-prev");
    // const next = document.querySelector(".offer__slider-next");
    // let current = document.querySelector("#current");
    // let total = document.querySelector("#total");
    // const slides = document.querySelectorAll(".offer__slide");
    // const slidesWrapper = document.querySelector(".offer__slider-wrapper");
    // const slidesField = document.querySelector(".offer__slider-inner");
    // const width = window.getComputedStyle(slidesWrapper).width;// значение ширины из css
    // let slideIndex = 1;
    // let offset = 0;

    // if(slides.length<10){
    //     total.textContent = `0${slides.length}`;
    //     current.textContent = `0${slideIndex}`;
    // }else{
    //     total.textContent = slides.length;
    //     current.textContent = slideIndex;
    // }

    // slidesField.style.width = 100 * slides.length + "%";
    // slidesField.style.display = "flex";
    // slidesField.style.transition = "0.5s all";
    // slidesWrapper.style.overflow = "hidden";

    // slides.forEach(slide => {
    //     slide.style.width = width;
    // });

    //     //slider navi
    // const slider = document.querySelector(".offer__slider");
    // const indicators = document.createElement("ol");
    // const dots =[];

    // slider.style.position = "relative";
    // indicators.classList.add("carousel-indicators");
    // slider.append(indicators);

    // for(let i = 0; i < slides.length; i++){
    //     const dot = document.createElement("li");
    //     dot.setAttribute("data-slide-to", i+1);
    //     dot .classList.add("dot");
    //     if(i == 0){
    //         dot.style.opacity = 1;
    //     }
    //     indicators.append(dot);
    //     dots.push(dot);
    // }  //slider navi

    // function changeCurrent(){
    //     if(slides.length<10){
    //         current.textContent = `0${slideIndex}`;
    //     }else{
    //         current.textContent = slideIndex;
    //     }
    //     dots.forEach(dot => dot.style.opacity = ".5");
    //     dots[slideIndex-1].style.opacity = 1;
    // }

    // function setOffset(){
    //     if(offset == +width.replace(/\D/g, "") * (slides.length -1)){// "500 px"
    //         offset = 0;
    //     }else{
    //         offset += +width.replace(/\D/g, "");
    //     }
    // }

    // next.addEventListener("click", () =>{
    //     setOffset();

    //     slidesField.style.transform = `translateX(-${offset}px)`;
    //     if(slideIndex == slides.length){
    //         slideIndex = 1;
    //     }else{
    //         slideIndex++;
    //     }

    //     changeCurrent();
    // });

    // prev.addEventListener("click", () =>{
    //     setOffset();

    //     slidesField.style.transform = `translateX(-${offset}px)`;
    //     if(slideIndex == 1){
    //         slideIndex = slides.length;
    //     }else{
    //         slideIndex--;
    //     }

    //     changeCurrent();
    // });

    // dots.forEach(dot => {
    //     dot.addEventListener("click", (event) => {
    //         const slideTo = event.target.getAttribute("data-slide-to");
    //         slideIndex = slideTo;
    //         offset = +width.replace(/\D/g, "") * (slideTo-1);
    //         slidesField.style.transform = `translateX(-${offset}px)`;

    //         changeCurrent();
    //     });
    // });

    // Calc
//     const result = document.querySelector(".calculating__result span");
//     let sex,weight, height, age, ratio;

//     if(localStorage.getItem("sex")){
//         sex = localStorage.getItem("sex");
//     }else{
//         sex = "female";
//         localStorage.setItem("sex", "female");
//     }

//     if(localStorage.getItem("ratio")){
//         ratio = localStorage.getItem("ratio");
//     }else{
//         ratio = 1.375;
//         localStorage.setItem("ratio", 1.375);
//     }

//     function initLocalSettings(selector, activeClass){
//         const elements = document.querySelectorAll(selector);

//         elements.forEach( el => {
//             el.classList.remove(activeClass);

//             if(el.getAttribute("id") === localStorage.getItem("sex")){
//                 el.classList.add(activeClass);
//             }
//             if(el.getAttribute("data-ratio") === localStorage.getItem("ratio")){
//                 el.classList.add(activeClass);
//             }
//         });
//     }

//     initLocalSettings("#gender div", "calculating__choose-item_active");
//     initLocalSettings(".calculating__choose_big div","calculating__choose-item_active");

//     function calcResult(){
//         if(!sex || !weight || !height || !age || !ratio){
//             result.textContent = "___";
//             console.log(sex, weight, height, age, ratio);
//             return;
//         }

//         if(sex === "female"){
//             result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
//         }else{
//             result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
//         }
//     }
//     calcResult();

//     function getStaticInfo(selector, activeClass){
//         const elements = document.querySelectorAll(selector);
//         elements.forEach( el => {
//             el.addEventListener("click", (e) => {
//                 if(e.target.getAttribute("data-ratio")){
//                     ratio = +e.target.getAttribute("data-ratio");
//                     localStorage.setItem("ratio", +e.target.getAttribute('data-ratio'));
//                 }else{
//                     sex = e.target.getAttribute("id");
//                     localStorage.setItem("sex", e.target.getAttribute('id'));
//                 }

//                 elements.forEach(el => {
//                     el.classList.remove(activeClass);
//                 });
//                 e.target.classList.add(activeClass);
//                 calcResult();
//             });
//         });
//     }

//     getStaticInfo("#gender div", "calculating__choose-item_active");
//     getStaticInfo(".calculating__choose_big div","calculating__choose-item_active");

//     function getDynamicInfo(selector){
//         const input = document.querySelector(selector);

//         input.addEventListener("input", () => {

//             if(input.value.match(/\D/g)){
//                 input.style.border = "1px solid red";
//             }else{
//                 input.style.border = "none";
//             }

//             switch(input.getAttribute("id")){
//                 case "height" : height = +input.value;
//                 break;
//                 case "weight" : weight = +input.value;
//                 break;
//                 case "age" : age = +input.value;
//                 break;
//             }
//             calcResult();
//         });
//     }
//     getDynamicInfo("#height");
//     getDynamicInfo("#weight");
//     getDynamicInfo("#age");
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map