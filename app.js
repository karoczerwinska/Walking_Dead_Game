function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", function () {

    var board = document.querySelector(".board");
    var score = 0;

    var cursor = document.createElement("div");
    cursor.classList.add("cursor");
    board.appendChild(cursor);

    var scoreEl = document.createElement("div");
    scoreEl.classList.add("score");
    board.appendChild(scoreEl);
    scoreEl.innerText = score;


    setInterval(function () {

        var zombie = document.createElement("div");
        zombie.classList.add("zombie");

        var posBottom = randomBetween(10, 170);
        zombie.style.bottom = posBottom + "px";

        var time = randomBetween(8, 12);
        zombie.style.animationDuration = "0.5s, " + time + "s";

        var zIndex = 170 - posBottom;
        zombie.style.zIndex = zIndex;

        var scale = 1;

        if (posBottom <= 40) {
            scale += 0.1;
        }
        else if (posBottom > 40 && posBottom <= 80) {
        }
        else if (posBottom > 80 && posBottom <= 120) {
            scale -= 0.1;
            zombie.style.filter = "blur(0.5px) brightness(.95)";
        }
        else {
            scale -= 0.2;
            zombie.style.filter = "blur(1px) brightness(.8)";
        }

        zombie.style.transform = "scale(" + scale + ")";


        zombie.addEventListener("animationend", function (e) {

            if (e.animationName === "zombieMove") {
                this.remove();

                [...document.querySelectorAll(".zombie")].forEach(function (zom) {
                    zom.style.animationDuration = "0.5s, 999999999s"
                });

                alert("GAME OVER. YOU ELIMINATED " + score + " ZOMBIES");
            }
        });

        zombie.addEventListener("click", function () {
            this.live--;
            if (this.live < 1) {
                this.remove();
                score++;
                scoreEl.innerText = score;
            } else {
                this.querySelector("span").style.width = this.live * 20 + "px";
            }
        });

        zombie.live = 3;

        var span = document.createElement("span");

        zombie.appendChild(span);

        board.appendChild(zombie);
    }, 1500);

    board.addEventListener("mousemove", function(e){
        cursor.style.left = e.pageX - 68 + "px";
        cursor.style.top =e.pageY - 68 + "px";

    })
});
