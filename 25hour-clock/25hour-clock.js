window.onload = function () {

    const seconds = document.getElementsByClassName("seconds")[0].children;
    const scales = document.getElementsByClassName("scale")[0].children;


    for (let i = 0; i < seconds.length; i++) {
        let deg_ =  i * 6
        seconds[i].style.transform = `rotate(${deg_}deg)`
    }

    for (let i = 0; i < scales.length; i++) {
        let deg_ = (i + 1) * 14.4;
        scales[i].style.transform = `rotate(${deg_}deg)`
    }

    const hour = document.getElementsByClassName("hour")[0];
    const min = document.getElementsByClassName("min")[0];
    const sec = document.getElementsByClassName("sec")[0];

    setInterval(function () {
        let time = new Date();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();

        let time_c = change(h, m, s);

        hour.style.transform = `rotate(${time_c[0]}deg)`
        min.style.transform = `rotate(${time_c[1]}deg)`
        sec.style.transform = `rotate(${time_c[2]}deg)`
    });

};

function change(hour, min, sec, time_gap=25) {

    const min_gap = 60 * 24 / time_gap;
    const total_sec = 24 * 60 * 60;

    let now_sec = hour * 60 * 60 + min * 60 + sec;
    let now_min = hour * 60 + min + (sec / 60);
    let h_c = (now_sec / total_sec) * 360;
    let m_c = ((now_min / min_gap) % 1) * 360;
    let s_c = sec * 6;

    return [h_c, m_c, s_c];
}
