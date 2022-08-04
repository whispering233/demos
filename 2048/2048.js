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


