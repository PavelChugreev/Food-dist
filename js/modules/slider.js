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
            offset = +width.replace(/\D/g, "") * (slides.length - 1)
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

export default slider;