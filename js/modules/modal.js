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
