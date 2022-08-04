const fly = document.getElementById('fly');
let skyX = 0,
    skyY = 0,
    c,
    timer;

document.addEventListener('mousemove', function (e){
    let contentX = fly.offsetLeft + fly.offsetWidth / 2,
        contentY = fly.offsetTop + fly.offsetWidth / 2,
        dX = e.clientX - contentX,
        dY = e.clientY - contentY;

    c = Math.atan2(dX, dY);
    c = 180 * c / Math.PI;
    c = c * -1;

    function to () {
        clearTimeout(timer);
        fly.style.transform = 'rotate(' + c + 'deg';
        if (c > -15 && c < 15) {
            skyY -= 5;
            document.body.style.backgroundPositionY = skyY + 'px';
        }
        if (c > 15 && c < 75) {
            // 左下角
            skyY -= 5
            skyX += 5
            document.body.style.backgroundPositionX = skyX + 'px';
            document.body.style.backgroundPositionY = skyY + 'px';
        }
        if (c > 75 && c < 105) {
            // 左
            skyX += 5;
            document.body.style.backgroundPositionX = skyX + 'px';
        }
        if (c > 105 && c < 165) {
            skyY += 5
            skyX += 5
            document.body.style.backgroundPositionX = skyX + 'px';
            document.body.style.backgroundPositionY = skyY + 'px';
        }
        if (c > 165 || c < -165) {
            skyY += 5
            document.body.style.backgroundPositionY = skyY + 'px';
        }
        if (c > -75 && c < -15) {
            skyY -= 5
            skyX -= 5
            document.body.style.backgroundPositionX = skyX + 'px';
            document.body.style.backgroundPositionY = skyY + 'px';
        }
        if (c > -105 || c < -75) {
            // 右
            skyX -= 5
            document.body.style.backgroundPositionX = skyX + 'px';
        }
        if (c > -165 && c < -105) {
            skyY -= 5
            skyX += 5
            document.body.style.backgroundPositionX = skyX + 'px';
            document.body.style.backgroundPositionY = skyY + 'px';
        }
        timer=setTimeout(to, 10)
    }

    to();
})
