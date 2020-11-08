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

export default tabs;