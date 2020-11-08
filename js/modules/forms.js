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