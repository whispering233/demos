window.onload = function () {

    const seconds = document.getElementsByClassName("seconds")[0].children;
    const scales = document.getElementsByClassName("scale")[0].children;
    const left = document.getElementsByClassName("left")[0]


    for (let i = 0; i < seconds.length; i++) {
        let deg_ =  i * 6
        seconds[i].style.transform = `rotate(${deg_}deg)`
    }

    for (let i = 0; i < scales.length; i++) {
        let deg_ = (i + 1) * 15;
        scales[i].style.transform = `rotate(${deg_}deg)`
    }

    const hour = document.getElementsByClassName("hour")[0];
    const min = document.getElementsByClassName("min")[0];
    const sec = document.getElementsByClassName("sec")[0];

    const time_rule = 25

    const hours_transfer_list = [];

    for (let i = 0; i < 24; i++) {
        hours_transfer_list.push(i)
    }

    setInterval(function () {
        let time_start = new Date("2000-1-1")
        let time_base = new Date("1996-7-29");
        let time = new Date();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();

        let time_now = time.getTime();

        let time_grow = time_now - time_base.getTime();

        // 获取已经过天数
        let day_grow = Math.floor(time_grow / 1000 / 60 / 60 / 24)
        let day_index = Math.floor(day_grow % 24);

        // 获取 当天 日期
        time_start.setTime(Math.round(time_start.getTime() + (time_grow * (24 / time_rule))));

        let y_c = time_start.getFullYear()
        let mn_c = time_start.getMonth()
        let d_c = time_start.getDate()

        y_c = parseInt(y_c) - 2000

        // 获取 当天的 时
        let h_c = h - hours_transfer_list[day_index]

        h_c = h_c > 0 ? h_c : h_c + 24

        left.innerHTML = y_c + "-" + mn_c + "-" + d_c;
        hour.style.transform = `rotate(${h_c * 15}deg)`
        min.style.transform = `rotate(${m * 6}deg)`
        sec.style.transform = `rotate(${s * 6}deg)`
    }, 1000);

};
