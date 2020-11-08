window.addEventListener("DOMContentLoaded", () => {
    const tabs = require("./modules/tabs"),
          modal = require("./modules/modal"),
          timer = require("./modules/timer"),
          slider = require("./modules/slider"),
          forms = require("./modules/forms"),
          cards = require("./modules/cards"),
          calc = require("./modules/calc");
    
    tabs();
    modal();
    timer();
    slider();
    forms();
    cards();
    calc();
});