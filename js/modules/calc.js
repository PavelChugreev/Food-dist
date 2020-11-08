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