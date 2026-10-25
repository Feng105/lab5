"use strict";

const canvas = document.getElementById("smileyCanvas");
const ctx = canvas.getContext("2d");

// colours
const BACKGROUND = "lightgreen";
const FACE_COLOUR = "yellow";
const LINE_COLOUR = "black";
const CAPTION_COLOUR = "#2E7D32";

// positions for a 600 x 600 canvas
const FACE = { cx: 300, cy: 300, radius: 239, lineWidth: 2 };
const EYES = [
    { x: 204, y: 240, radius: 18 },
    { x: 396, y: 240, radius: 18 }
];
const NOSE = { x: 300, fromY: 300, toY: 359 };
const SMILE = { cx: 300, cy: 360, radius: 90, startAngle: 20 * Math.PI / 180, endAngle: 160 * Math.PI / 180 };
const CAPTION = { text: "The Canvas brought me to life!", x: 300, y: 590, font: "bold 36px Arial, Helvetica, sans-serif" };

function drawBackground() {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawHead() {
    ctx.beginPath();
    ctx.arc(FACE.cx, FACE.cy, FACE.radius, 0, Math.PI * 2);
    ctx.fillStyle = FACE_COLOUR;
    ctx.fill();
    ctx.lineWidth = FACE.lineWidth;
    ctx.strokeStyle = LINE_COLOUR;
    ctx.stroke();
}

function drawEyes() {
    ctx.fillStyle = LINE_COLOUR;
    for (const eye of EYES) {
        ctx.beginPath();
        ctx.arc(eye.x, eye.y, eye.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawNose() {
    ctx.beginPath();
    ctx.moveTo(NOSE.x, NOSE.fromY);
    ctx.lineTo(NOSE.x, NOSE.toY);
    ctx.lineWidth = FACE.lineWidth;
    ctx.strokeStyle = LINE_COLOUR;
    ctx.stroke();
}

function drawSmile() {
    ctx.beginPath();
    ctx.arc(SMILE.cx, SMILE.cy, SMILE.radius, SMILE.startAngle, SMILE.endAngle);
    ctx.lineWidth = FACE.lineWidth;
    ctx.strokeStyle = LINE_COLOUR;
    ctx.stroke();
}

function drawCaption() {
    ctx.fillStyle = CAPTION_COLOUR;
    ctx.font = CAPTION.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(CAPTION.text, CAPTION.x, CAPTION.y);
}

drawBackground();
drawHead();
drawEyes();
drawNose();
drawSmile();
drawCaption();
