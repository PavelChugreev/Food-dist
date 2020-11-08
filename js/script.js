import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import slider from "./modules/slider";
import forms from "./modules/forms";
import cards from "./modules/cards";
import calc from "./modules/calc";
import openModalWindow from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
    const modalWindowTimer = setTimeout(() => openModalWindow(".modal", modalWindowTimer), 30000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal("[data-modal]", ".modal", modalWindowTimer);
    timer(".timer", "2020-12-15");
    slider({
        container: ".offer__slider", 
        slide: ".offer__slide",
        totalCounter: "#total",
        currentCounter: "#current",
        nextArrow: ".offer__slider-next",
        prevArrow:".offer__slider-prev",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
    forms("form", modalWindowTimer);
    cards();
    calc();
});