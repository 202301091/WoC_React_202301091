let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let sci = document.getElementById("sci");
let msg = document.querySelector(".msg");
let you = document.querySelector("#your");
let com = document.querySelector("#com");
let btn = document.querySelector(".btn");
console.log(rock);
console.log(paper);
console.log(sci);



let msg1 = "You Win Computer chose Rock";
let msg2 = "You Win Computer chose paper";
let msg3 = "You Win Computer chose scissor";
let msg4 = "You lose Computer chose Rock";
let msg5 = "You lose  Computer chose paper";
let msg6 = "You lose Computer chose scissor";
let msg7 = "Match is Draw";

const random = (ran) => {
    if (ran < 0.35) {
        return 1;
    } else if (ran < 0.70) {
        return 2;
    }
    return 3;
}
let your = 0;
let computer = 0;
const point = (val) => {

    if (val == 0) {
        com.innerHTML = computer + 1;
        computer++;
    } else {
        you.innerHTML = your + 1;
        your++;
    }
}
const check = (num, rad) => {
    console.log(num, "->", rad);
    if (num == rad) {
        return msg7;
    }
    if (num == 1 && rad == 2) {
        point(0);
        return msg5;
    }

    if (num == 1 && rad == 3) {
        point(1);
        return msg3;
    }

    if (num == 2 && rad == 1) {
        point(1);
        return msg1;
    }

    if (num == 2 && rad == 3) {
        point(0);
        return msg6;
    }

    if (num == 3 && rad == 1) {
        point(0);
        return msg4;
    }

    if (num == 3 && rad == 2) {
        point(1);
        return msg2;
    }
}

const time=()=>{
    setTimeout(() => {
        msg.innerHTML="Chose Your Move"
    }, 2000);
}
rock.addEventListener("click", () => {
    // console.log("Rock");
    let rand = Math.random();
    rand = random(rand);
    msg.innerHTML = check(1, rand);
    time();
})

paper.addEventListener("click", () => {
    // console.log("Rock");
    let rand = Math.random();
    rand = random(rand);
    msg.innerHTML = check(2, rand);
    time();
    
})

sci.addEventListener("click", () => {
    // console.log("Rock");
    let rand = Math.random();
    rand = random(rand);
    msg.innerHTML = check(3, rand);
    time();
})

btn.addEventListener("click", () => {
    your = 0;
    computer = 0;

    com.innerHTML = computer;
    you.innerHTML = your;
    msg.innerHTML="Chose Your Move"

})