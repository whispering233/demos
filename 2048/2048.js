var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent)
            element.attachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if(element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if(element.detachEvent)
            element.detachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    /**
     * 监听触摸的方向
     * @param target            要绑定监听的目标元素
     * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;
        function handleTouchEvent(event) {
            switch (event.type){
                case "touchstart":
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case "touchend":
                    var spanX = event.changedTouches[0].pageX - startX;
                    var spanY = event.changedTouches[0].pageY - startY;

                    if(Math.abs(spanX) > Math.abs(spanY)){      //认定为水平方向滑动
                        if(spanX > 30){         //向右
                            if(rightCallback)
                                rightCallback();
                        } else if(spanX < -30){ //向左
                            if(leftCallback)
                                leftCallback();
                        }
                    } else {                                    //认定为垂直方向滑动
                        if(spanY > 30){         //向下
                            if(downCallback)
                                downCallback();
                        } else if (spanY < -30) {//向上
                            if(upCallback)
                                upCallback();
                        }
                    }

                    break;
                case "touchmove":
                    //阻止默认行为
                    if(isPreventDefault)
                        event.preventDefault();
                    break;
            }
        }
    }
};

const sum_div = document.querySelector("#sum")
const divs = document.querySelectorAll("#box>div");
const arr = [[], [], [], []];
let num = 0;
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        arr[i][j] = divs[num];
        num++;
    }
}

// console.log(arr);

//游戏开始产生2个随机数
rand();
rand();
bgcolor();
//上下左右的监听事件

window.onkeydown = function (e) {

    if (!haveBlank()) {
        change();
    }

    switch (e.keyCode) {
        case 37 :
            left();
            break;
        case 38 :
            up();
            break;
        case 39 :
            right();
            break;
        case 40 :
            down();
            break;
    }

    if (haveBlank()) {
        rand();
    }

    sum_div.innerHTML = sum()

    bgcolor();
}

function touch_left() {
    if (!haveBlank()) {
        change();
    }

    left()

    if (haveBlank()) {
        rand();
    }

    sum_div.innerHTML = sum()

    bgcolor();
}

function touch_right() {
    if (!haveBlank()) {
        change();
    }

    right()

    if (haveBlank()) {
        rand();
    }

    sum_div.innerHTML = sum()

    bgcolor();
}

function touch_up() {
    if (!haveBlank()) {
        change();
    }

    up()

    if (haveBlank()) {
        rand();
    }

    sum_div.innerHTML = sum()

    bgcolor();
}

function touch_down() {
    if (!haveBlank()) {
        change();
    }

    down()

    if (haveBlank()) {
        rand();
    }

    sum_div.innerHTML = sum()

    bgcolor();
}



EventUtil.listenTouchDirection(document, false, touch_up, touch_right, touch_down, touch_left)



// 计算总分
function sum() {

    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j].innerHTML !== "") {
                res += parseInt(arr[i][j].innerHTML);
            }
        }
    }
    return res.toString()
}


//产生一个数字
// 直接注入
function rand() {
    const x = Math.floor(Math.random() * 4);
    const y = Math.floor(Math.random() * 4);
    if (arr[x][y].innerHTML === "") {
        arr[x][y].innerHTML = Math.random() > 0.5 ? 2 : 2;
    } else {
        rand();
    }
}


// 判断是否有多余格子
function haveBlank() {
    let bool = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j].innerHTML === "") {
                bool = true;
            }
        }
    }
    return bool;
}

function change() {
    let bool = true;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[i][j].innerHTML === arr[i][j + 1].innerHTML
                || arr[i][j].innerHTML === arr[i + 1][j].innerHTML
                || arr[i + 1][j].innerHTML === arr[i + 1][j + 1].innerHTML
                || arr[i][j + 1].innerHTML === arr[i + 1][j + 1].innerHTML) {
                bool = false;
            }
        }
    }
    if (bool) {
        alert("游戏结束！总分为：" + sum())
        restart()
    }
}


//游戏重新开始的函数
function restart() {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            arr[i][j].innerHTML = "";
        }
    }
    rand();
    rand();
}


//不同的数字添加不同的背景颜色
function bgcolor() {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {

            switch (arr[i][j].innerHTML) {
                case '2':
                    arr[i][j].style.backgroundColor = "#EEE4DA";
                    break;
                case '4':
                    arr[i][j].style.backgroundColor = "#EDE0C8";
                    break;
                case '8':
                    arr[i][j].style.backgroundColor = "#F2B179";
                    break;
                case '16':
                    arr[i][j].style.backgroundColor = "#F59563";
                    break;
                case '32':
                    arr[i][j].style.backgroundColor = "#F67C5F";
                    break;
                case '64':
                    arr[i][j].style.backgroundColor = "#F65E3B";
                    break;
                case '128':
                    arr[i][j].style.backgroundColor = "#EDCF72";
                    break;
                case '256':
                    arr[i][j].style.backgroundColor = "#EDCC61";
                    break;
                case '512':
                    arr[i][j].style.backgroundColor = "#EDC850";
                    break;
                case '1024':
                    arr[i][j].style.backgroundColor = "yellowgreen";
                    break;
                case '2048':
                    arr[i][j].style.backgroundColor = "perple";
                    break;
                default:
                    arr[i][j].style.backgroundColor = "#CDC1B4";
                    break;

            }
        }
    }

}


//上下左右按下执行的函数

function right() {
    for (let i = 0; i < 4; i++) {

        let l = 3;
        let r = 3;
        // 赋值
        while (r - 1 >= 0) {
            if (arr[i][r].innerHTML === "") {
                r--;
                continue
            }
            l = r - 1
            while (l >= 0) {
                if (arr[i][l].innerHTML === "") {
                    l--;
                } else {
                    break
                }
            }
            // 一次操作只能变动一次
            if (l >= 0 && arr[i][l].innerHTML === arr[i][r].innerHTML) {
                arr[i][r].innerHTML *= 2;
                arr[i][l].innerHTML = "";

            }
            r = l;

        }
        // 移动
        l = 3;
        r = 3;
        while (r - 1 >= 0) {
            if (arr[i][r].innerHTML !== "") {
                r--;
                continue;
            }
            l = r - 1;
            while (l >= 0) {
                if (arr[i][l].innerHTML === "") {
                    l--;
                } else {
                    break
                }
            }
            if (l >= 0) {
                arr[i][r].innerHTML = arr[i][l].innerHTML;
                arr[i][l].innerHTML = "";
            }
            // l 在寻找 非空的时候可能会跨越多个空值
            r -= 1;
        }
    }
}

function left() {
    for (let i = 0; i < 4; i++) {
        let l = 0;
        let r = 0;
        // 赋值
        while (r + 1 <= 3) {
            if (arr[i][r].innerHTML === "") {
                r++;
                continue
            }
            l = r + 1
            while (l <= 3) {
                if (arr[i][l].innerHTML === "") {
                    l++;
                } else {
                    break
                }
            }
            // 一次操作只能变动一次
            if (l <= 3 && arr[i][l].innerHTML === arr[i][r].innerHTML) {
                arr[i][r].innerHTML *= 2;
                arr[i][l].innerHTML = "";

            }
            r = l;

        }
        // 移动
        l = 0;
        r = 0;
        while (r + 1 <= 3) {
            if (arr[i][r].innerHTML !== "") {
                r++;
                continue;
            }
            l = r + 1;
            while (l <= 3) {
                if (arr[i][l].innerHTML === "") {
                    l++;
                } else {
                    break
                }
            }
            if (l <= 3) {
                arr[i][r].innerHTML = arr[i][l].innerHTML;
                arr[i][l].innerHTML = "";
            }
            // l 在寻找 非空的时候可能会跨越多个空值
            r += 1;
        }
    }
}

function down() {
    for (var i = 0; i < 4; i++) {
        let l = 3;
        let r = 3;
        // 赋值
        while (r - 1 >= 0) {
            if (arr[r][i].innerHTML === "") {
                r--;
                continue
            }
            l = r - 1
            while (l >= 0) {
                if (arr[l][i].innerHTML === "") {
                    l--;
                } else {
                    break
                }
            }
            // 一次操作只能变动一次
            if (l >= 0 && arr[l][i].innerHTML === arr[r][i].innerHTML) {
                arr[r][i].innerHTML *= 2;
                arr[l][i].innerHTML = "";

            }
            r = l;

        }
        // 移动
        l = 3;
        r = 3;
        while (r - 1 >= 0) {
            if (arr[r][i].innerHTML !== "") {
                r--;
                continue;
            }
            l = r - 1;
            while (l >= 0) {
                if (arr[l][i].innerHTML === "") {
                    l--;
                } else {
                    break
                }
            }
            if (l >= 0) {
                arr[r][i].innerHTML = arr[l][i].innerHTML;
                arr[l][i].innerHTML = "";
            }
            // l 在寻找 非空的时候可能会跨越多个空值
            r -= 1;
        }
    }
}

function up() {
    for (var i = 0; i < 4; i++) {
        let l = 0;
        let r = 0;
        // 赋值
        while (r + 1 <= 3) {
            if (arr[r][i].innerHTML === "") {
                r++;
                continue
            }
            l = r + 1
            while (l <= 3) {
                if (arr[l][i].innerHTML === "") {
                    l++;
                } else {
                    break
                }
            }
            // 一次操作只能变动一次
            if (l <= 3 && arr[l][i].innerHTML === arr[r][i].innerHTML) {
                arr[r][i].innerHTML *= 2;
                arr[l][i].innerHTML = "";

            }
            r = l;

        }
        // 移动
        l = 0;
        r = 0;
        while (r + 1 <= 3) {
            if (arr[r][i].innerHTML !== "") {
                r++;
                continue;
            }
            l = r + 1;
            while (l <= 3) {
                if (arr[l][i].innerHTML === "") {
                    l++;
                } else {
                    break
                }
            }
            if (l <= 3) {
                arr[r][i].innerHTML = arr[l][i].innerHTML;
                arr[l][i].innerHTML = "";
            }
            // l 在寻找 非空的时候可能会跨越多个空值
            r += 1;
        }
    }

}


