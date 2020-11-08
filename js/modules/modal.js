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

export default modal;
export {openModalWindow};
export {closeModalWindow};
