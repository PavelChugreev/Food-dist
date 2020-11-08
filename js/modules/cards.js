import {getResourse} from "../services/services";

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

    getResourse("http://localhost:3000/menu")
        .then(data => {
            data.forEach( ({img, altimg, title, descr, price}) => {//деструктуризация объекта
                new TypeOfMenu(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
}

export default cards;