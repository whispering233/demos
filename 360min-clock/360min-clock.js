window.onload = function () {

    const seconds = document.getElementsByClassName("seconds")[0].children;
    const scales = document.getElementsByClassName("scale")[0].children;


    for (let i = 0; i < seconds.length; i++) {
        seconds[i].style.transform = `rotate(${i}deg)`
    }

    for (let i = 0; i < scales.length; i++) {
        let deg_ = (i + 1) * 14.4;
        scales[i].style.transform = `rotate(${deg_}deg)`
    }

    const hour = document.getElementsByClassName("hour")[0];
    const sec = document.getElementsByClassName("sec")[0];

    setInterval(function () {
        let time = new Date();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();

        let time_c = change(h, m, s);

        hour.style.transform = `rotate(${time_c[0]}deg)`
        sec.style.transform = `rotate(${time_c[2]}deg)`
    }, 1000);

};

function change(hour, min, sec) {

    const total_sec = 24 * 60 * 60
    let now_sec = hour * 60 * 60 + min * 60 + sec;

    let h_c = (now_sec / total_sec) * 360
    let s_c = ((now_sec % 3456) / 9.6);

    return [h_c, s_c];
}
