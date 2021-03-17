var vmin, vmax, vh, vw;

function vminmax() {
  if (window.innerHeight > window.innerWidth) {
    vmax = window.innerHeight;
    vmin = window.innerWidth;
  } else {
    vmax = window.innerWidth;
    vmin = window.innerHeight;
  }

  vh = window.innerHeight;
  vw = window.innerWidth;
  // console.log(vmin);
  // console.log(vmax);
}

function resizeText() {
  let textElements = document.querySelectorAll(".resizable");
  // console.log(textElements);
  let buttonsWidth = vmin / 100 * 10;
  for (var i = 0; i < textElements.length; i++) {
    let element = textElements[i];
    let textWidth = element.clientWidth;
    let textCharacters = element.innerText.length;
    element.style.fontSize = textWidth / textCharacters + "px";
  }

  let textElementsIcons = document.querySelectorAll(".resizableIcons");
  // console.log(textElements);
  let buttonsWidthIcons = vmin / 100 * 10;
  for (var i = 0; i < textElementsIcons.length; i++) {
    let elementIcons = textElementsIcons[i];
    let textWidthIcons = elementIcons.clientWidth;
    let textCharactersIcons = elementIcons.innerText.length;
    elementIcons.style.fontSize = (textWidthIcons / textCharactersIcons) / 2 + "px";
  }
}

function numberPlace() {
  if (vh > vw) {
    $(".oppgave").addClass("height");
    $("oppgave").removeClass("width");
  } else {
    $(".oppgave").addClass("width");
    $(".oppgave").removeClass("height");

  }
}

$(window).resize(function () {
  vminmax();
  numberPlace();
  resizeText();
});

$(function () {
  vminmax();
  numberPlace();
  resizeText();
});

$(".back").click(function () {
  $(".numberInput").val($(".numberInput").val().slice(0, $(".numberInput").val().length - 1));
});

$(".hamburger").click(function () {
  $(".meny").toggleClass("visible");
});

$(document).on("keypress", function (e) {
  //console.log(e.which);
  switch (e.which) {
    case 49:
      //console.log(1);
      $(".numberOne").click();
      break;
    case 50:
      //console.log(2);
      $(".numberTwo").click();
      break;
    case 51:
      //console.log(3);
      $(".numberThree").click();
      break;
    case 52:
      //console.log(4);
      $(".numberFour").click();
      break;
    case 53:
      //console.log(5);
      $(".numberFive").click();
      break;
    case 54:
      //console.log(6);
      $(".numberSix").click();
      break;
    case 55:
      //console.log(7);
      $(".numberSeven").click();
      break;
    case 56:
      //console.log(8);
      $(".numberEight").click();
      break;
    case 57:
      //console.log(9);
      $(".numberNine").click();
      break;
    case 48:
      //console.log(0);
      $(".numberZero").click();
      break;
    default:
      break;
  }
});

document.onkeydown = function (event) {
  var key = event.keyCode || event.charCode;
  if (key == 8) {
    $(".back").click();
  }
};

var correctAnswer = 2,
  regneart = "+",
  tall = 5,
  score = 0;

$(".number").click(function () {
  $(".numberInput").val($(".numberInput").val() + $(this).attr("number"));

  let answer = $(".numberInput").val();
  // console.log(answer);
  if (answer.toString().length > 0) {
    if (answer == correctAnswer) {
      score++;
      // console.log("Riktig");
      $(".flowersdiv").append(`<img src="assets/flower${Math.floor(Math.random() * 9) + 1}.png" />`);
      generateNumbers();
      document.querySelector(".numberInput").value = "";
      $(".score").text(score + " Poeng");
      resizeText();

      $(".oppgavetitle").append(`<img src="assets/star.png" class="star">`);

      var audio = new Audio('assets/star.mp3');
      audio.play();
    } else {
      return;
    }
  } else {
    return;
  }
});

$(".regneart").click(function () {
  $(".valgt.regneart").removeClass("valgt").addClass("velge");
  $(this).addClass("valgt").removeClass("velge");
  regneart = this.innerText;
  // localStorage.setItem("regneart", regneart);
  // localStorage.setItem("regnearten", "true");
  generateNumbers();
  reset();
});

$(".tall").click(function () {
  $(".valgt.tall").removeClass("valgt").addClass("velge");
  $(this).addClass("valgt").removeClass("velge");
  tall = eval(this.innerText.slice(4));
  // localStorage.setItem("tall", this.innerText.slice(4));
  // localStorage.setItem("tallet", "true");
  generateNumbers();
  reset();
});

function generateNumbers() {
  let str = "";
  let num = 2;
  let num1 = Math.floor(Math.random() * tall) + 1;
  let num2 = Math.floor(Math.random() * tall) + 1;

  if (regneart == "-") {
    if (num1 >= num2) {
      str = "" + num1 + " - " + num2;
      num = num1 - num2;
    } else {
      str = "" + num2 + " - " + num1;
      num = num2 - num1;
    }
  } else if (regneart == "×") {
    str = "" + num1 + " × " + num2;
    num = num1 * num2;
  } else if (regneart == ":") {
    while (num1 % num2 > 0) {
      num2 = Math.floor(Math.random() * tall) + 1;
    }
    str = "" + num1 + " : " + num2;
    num = num1 / num2;
  } else {
    str = "" + num1 + " + " + num2;
    num = num1 + num2;
  }

  correctAnswer = num;
  $(".oppgavetitle h1").text(str);

  resizeText();
}

$(window).resize(function () {
  vminmax();
  numberPlace();
  resizeText();
});

$(function () {
  // if (localStorage.getItem("regnearten") == "true") {
  //   regneart = localStorage.getItem("regneart");
  // }
  // if (localStorage.getItem("tallet") == "true") {
  //   tall = eval(localStorage.getItem("regneart"));
  // }

  console.log(tall);
  console.log(regneart);
  generateNumbers();
  vminmax();
  numberPlace();
  resizeText();
});

function reset() {
  $(".score").text("0 Poeng");
  $(".flowersdiv").html("");
  $(".star").remove();
  score = 0;
}