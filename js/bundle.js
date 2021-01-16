/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modules_menu_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/menu-db */ "./js/modules/menu-db.js");
// import {getResourse} from "../services/services";
;
console.log(_modules_menu_db__WEBPACK_IMPORTED_MODULE_0__.default)
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

    // getResourse("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach( ({img, altimg, title, descr, price}) => {//деструктуризация объекта
    //             new TypeOfMenu(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

    console.log(_modules_menu_db__WEBPACK_IMPORTED_MODULE_0__.default)
    _modules_menu_db__WEBPACK_IMPORTED_MODULE_0__.default.forEach( ({img, altimg, title, descr, price}) => {
        new TypeOfMenu(img, altimg, title, descr, price, ".menu .container").render();
    }); 

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
;


function forms(formSelector, modalWindowTimer){
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: "img/form/original.svg",
        success: "Done",
        failure: "Error"
    };

    forms.forEach( item => {
        bindData(item);
    });

    function bindData(form){
        form.addEventListener("submit", (e) => {  //обработчик по нажатию кнопки подтверждения отправки формы
            e.preventDefault();

            let statusMessage = document.createElement("img");
            statusMessage.classList.add("spinner");
            statusMessage.src = message.loading;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);// конструктор введенных данных из формы
            const json = JSON.stringify(Object.fromEntries(formData.entries()));//formData.entries превращение 
            //formData в массив массивов //Object.fromEntries переводим ее в классический объект, и потом в формат JSON
            
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModalWindow)(".modal", modalWindowTimer);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)(".modal");
        },2000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/menu-db.js":
/*!*******************************!*\
  !*** ./js/modules/menu-db.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const menu = [
    {
        img: "img/tabs/vegy.jpg",
        altimg: "vegy",
        title: "Меню 'Фитнес'",
        descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        price: 9
    },
    {
        "img": "img/tabs/post.jpg",
        altimg: "post",
        title: "Меню 'Постное'",
        descr: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        price: 14
    },
    {
        "img": "img/tabs/elite.jpg",
        altimg: "elite",
        title: "Меню 'Премиум'",
        descr: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        price: 21
    }
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export closeModalWindow [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export openModalWindow [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "openModalWindow": () => /* binding */ openModalWindow,
/* harmony export */   "closeModalWindow": () => /* binding */ closeModalWindow
/* harmony export */ });
function openModalWindow(modalWindowSelector, modalWindowTimer){
    const modalWindow = document.querySelector(modalWindowSelector);
    // modalWindow.style.display = "block";//или
    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";// не прокручивает соержимое страницы при открытом модальном окне 

    if(modalWindowTimer){ //если аргумент передан
        clearInterval(modalWindowTimer);// мод окно не будет всплывать через N секундб если оно уже было вызвано
    }
}

function closeModalWindow(modalWindowSelector){
    const modalWindow = document.querySelector(modalWindowSelector);
    // modalWindow.style.display = "none"; // или
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";//возвращает по умолчанию
}

function modal(buttonSelector, modalWindowSelector, modalWindowTimer){
    const openModalButtons = document.querySelectorAll(buttonSelector);
    const modalWindow = document.querySelector(modalWindowSelector);
    // const closeModalWindowButton  = document.querySelector("[data-close]");

    openModalButtons.forEach( item => {
        item.addEventListener("click", () => openModalWindow(modalWindowSelector, modalWindowTimer));
    });

    // closeModalWindowButton.addEventListener("click", closeModalWindow);

    modalWindow.addEventListener("click", (e) => {
        if(e.target === modalWindow || e.target.getAttribute("data-close") == "" ){
            closeModalWindow(modalWindowSelector);
        }
    });

    document.addEventListener("keydown", (e) => { //закртыие по нажатию ESC на клаве
        if( e.code === "Escape"  ){
            closeModalWindow(modalWindowSelector);
        }
    });

    function showModalByScroll(){ //вызов мод окна при прокрутки стр до конца
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            //прокрученная часть + высота видимой часть страницы >= всей высоты прокрутки
            openModalWindow(modalWindowSelector, modalWindowTimer);
            window.removeEventListener("scroll", showModalByScroll);//удаляем обработчик чтобы окно всплыло только 1 раз
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({container, slide, totalCounter, currentCounter, nextArrow, prevArrow, wrapper, field}){
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    let current = document.querySelector(currentCounter);
    let total = document.querySelector(totalCounter);
    const slides = document.querySelectorAll(slide);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
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

    next.addEventListener("click", () =>{
        if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {// "500 px"
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, "");
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }

        changeCurrent();
    });

    prev.addEventListener("click", () =>{
        if(offset == 0){
            offset = +width.replace(/\D/g, "") * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, "");
        }

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsWrapper = document.querySelector(tabsParentSelector);

    function hideTabsContent(){
        tabsContent.forEach(item => {
            // item.style.display = "none";//через инлайн стили
            item.classList.add("hide");//через классы
            item.classList.remove("show", "fade");//через классы
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTab(i = 0){ // i=0 если фция будет передаваться без аргумента, по умолч будет 0
        tabsContent.forEach(item => {
            // tabsContent[i].style.display = "block";
            tabsContent[i].classList.remove("hide");//через классы
            tabsContent[i].classList.add("show","fade"); // fade тип анимации из mycss.css
        });
        tabsContent.forEach(item => {
            tabs[i].classList.add(activeClass);
        });
    }

    hideTabsContent();
    showTab(0);

    tabsWrapper.addEventListener( "click", event => {
        const target = event.target; //нажатый элемент
        if ( target && target.classList.contains(tabsSelector.slice(1))){ // "tabheader__item" //если таргет содержит класс ""
            tabs.forEach((item,i) => { //тогда перебираем все табы(кнопки) и....
                if(target == item){ // евсли нажаты элемент совпадает с перебираемым табом тогда...
                    hideTabsContent(); // очищаем контент и..
                    showTab(i); //показываем контент под номером нажатого таба               
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
;








window.addEventListener("DOMContentLoaded", () => {
    const modalWindowTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModalWindow)(".modal", modalWindowTimer), 5000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)("[data-modal]", ".modal", modalWindowTimer);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)(".timer", "2021-12-15");
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)({
        container: ".offer__slider", 
        slide: ".offer__slide",
        totalCounter: "#total",
        currentCounter: "#current",
        nextArrow: ".offer__slider-next",
        prevArrow:".offer__slider-prev",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)("form", modalWindowTimer);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! namespace exports */
/*! export getResourse [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResourse": () => /* binding */ getResourse
/* harmony export */ });
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

const getResourse = async (url) => {
    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};




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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map