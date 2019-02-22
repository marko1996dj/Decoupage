"use strict";
$(document).ready(function () {

  var rows = 4; //change this also in css
  var cols = 6; //change this also in css
  var staggerTime = 150;

  var urls = [
    "images/gallery/1.webp",
    "images/gallery/2.webp",
    "images/gallery/3.webp",
    "images/gallery/4.webp",
    "images/gallery/5.webp",
    "images/gallery/6.webp",
    "images/gallery/7.webp",
    "images/gallery/8.webp",
    "images/gallery/9.webp",
    "images/gallery/10.webp",
    "images/gallery/11.webp",
    "images/gallery/12.webp",
    "images/gallery/13.webp",
    "images/gallery/14.webp",
    "images/gallery/15.webp",
    "images/gallery/16.webp",
    "images/gallery/17.webp",
    "images/gallery/18.webp",
    "images/gallery/19.webp",
    "images/gallery/20.webp",
    "images/gallery/21.webp",
    "images/gallery/22.webp",
    "images/gallery/23.webp",
    "images/gallery/24.webp",
  ];

  var $gallery = $(".demo__gallery");
  var $help = $(".demo__help");
  var partsArray = [];
  var reqAnimFr = (function () {
    return window.requestAnimationFrame || function (cb) {
      setTimeout(cb, 1000 / 60);
    }
  })();

  for (let row = 1; row <= rows; row++) {
    partsArray[row - 1] = [];
    for (let col = 1; col <= cols; col++) {
      $gallery.append(`<div class="show-front demo__part demo__part-${row}-${col}" row="${row}" col="${col}"><div class="demo__part-back"><div class="demo__part-back-inner"></div></div><div class="demo__part-front"></div></div>`);
      partsArray[row - 1][col - 1] = new Part();
    }
  }

  var $parts = $(".demo__part");
  var $image = $(".demo__part-back-inner");
  var help = true;

  for (let i = 0; i < $parts.length; i++) {
    $parts.find(".demo__part-front").eq(i).css("background-image", `url(${urls[i]})`);
  }

  $gallery.on("click", ".demo__part-front", function () {

    $image.css("background-image", $(this).css("background-image"));
    if (help) {
      $help.html("Deo mojih radova");
      help = false;
    }

    let row = +$(this).closest(".demo__part").attr("row");
    let col = +$(this).closest(".demo__part").attr("col");
    waveChange(row, col);
  });

  $gallery.on("click", ".demo__part-back", function () {
    if (!isShowingBack()) return;


    setTimeout(function () {
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
          partsArray[row - 1][col - 1].showing = "front";
        }
      }
    }, staggerTime + $parts.length * staggerTime / 10);


    showFront(0, $parts.length);

  });

  function showFront(i, maxI) {
    if (i >= maxI) return;
    $parts.eq(i).addClass("show-front");

    reqAnimFr(function () {
      showFront(i + 1);
    });
  }

  function isShowingBack() {
    return partsArray[0][0].showing == "back" && partsArray[0][cols - 1].showing == "back" && partsArray[rows - 1][0].showing == "back" && partsArray[rows - 1][cols - 1].showing == "back";
  }

  function Part() {
    this.showing = "front";
  }

  function waveChange(rowN, colN) {
    if (rowN > rows || colN > cols || rowN <= 0 || colN <= 0) return;
    if (partsArray[rowN - 1][colN - 1].showing == "back") return;
    $(".demo__part-" + rowN + "-" + colN).removeClass("show-front");
    partsArray[rowN - 1][colN - 1].showing = "back";
    setTimeout(function () {
      waveChange(rowN + 1, colN);
      waveChange(rowN - 1, colN);
      waveChange(rowN, colN + 1);
      waveChange(rowN, colN - 1);
    }, staggerTime);
  }
});