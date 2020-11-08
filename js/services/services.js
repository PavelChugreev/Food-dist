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

export {postData};
export {getResourse};