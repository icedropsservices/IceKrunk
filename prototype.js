// ==UserScript==
// @name         Krunker Hacks
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds hacks to Krunker.io
// @author       Your Name
// @match        *://krunker.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the GUI
    const gui = document.createElement('div');
    gui.innerHTML = `
        <style>
            #krunkerHacksGui {
                position: fixed;
                top: 10px;
                right: 10px;
                background-color: #2e2e2e;
                color: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                z-index: 10000;
            }
            #toggleHacks {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }
        </style>
        <div id="krunkerHacksGui">
            <h1>Krunker Hacks</h1>
            <button id="toggleHacks">Toggle Hacks</button>
        </div>
    `;
    document.body.appendChild(gui);

    // Get the canvas element
    var canvas = document.querySelector('canvas');

    // Add event listeners for mouse and keyboard input
    var hacksEnabled = false;
    var spinbotRunning = false;
    var spinbotInterval;

    function onMouseMove(e) {
        if (!hacksEnabled) return;

        // Aimbot
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        // Aim at the crosshair
        canvas.style.cursor = 'crosshair';
        // Move the crosshair to the mouse position
        var crosshair = document.querySelector('.crosshair');
        crosshair.style.left = x + 'px';
        crosshair.style.top = y + 'px';

        // ESP
        var enemies = document.querySelectorAll('.enemy');
        for (var i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            var enemyRect = enemy.getBoundingClientRect();
            var distance = Math.sqrt(Math.pow(x - enemyRect.left - enemyRect.width / 2, 2) + Math.pow(y - enemyRect.top - enemyRect.height / 2, 2));
            if (distance < 100) {
                enemy.style.border = '5px solid red';
            } else {
                enemy.style.border = '1px solid black';
            }
        }
    }

    function onKeyPress(e) {
        if (!hacksEnabled) return;

        // Bhop
        if (e.key === 'space') {
            // Perform a bunny hop
            document.body.style.top = '-10px';
            window.setTimeout(function () {
                document.body.style.top = '0px';
            }, 10);
        }

        // Triggerbot
        if (e.key === 'shift') {
            // Trigger a shot
            var gun = document.querySelector('.gun');
            gun.click();
        }

        // Spinbot
        if (e.key === 'f') {
            if (!spinbotRunning) {
                spinbotRunning = true;
                spinbotInterval = setInterval(function () {
                    var player = document.querySelector('.player');
                    player.style.transform = 'rotate(180deg)';
                    window.setTimeout(function () {
                        player.style.transform = '';
                    }, 500);
                }, 500);
            } else {
                clearInterval(spinbotInterval);
                spinbotRunning = false;
            }
        }

        // Speed hack
        if (e.key === 'e') {
            // Enable or disable speed hack
            var player = document.querySelector('.player');
            if (player.style.transform === '') {
                player.style.transform = 'scale(1.5)';
            } else {
                player.style.transform = '';
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onKeyPress);

    document.getElementById('toggleHacks').addEventListener('click', function () {
        hacksEnabled = !hacksEnabled;
        if (hacksEnabled) {
            this.textContent = 'Disable Hacks';
        } else {
            this.textContent = 'Enable Hacks';
        }
    });
})();
