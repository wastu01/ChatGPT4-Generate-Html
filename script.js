// script.js

let currentInput = "";
let previousInput = "";
let action = null;

const screen = document.querySelector('.screen');

document.querySelector('.buttons').addEventListener('click', function (e) {
    const btnValue = e.target.innerText;

    if (!isNaN(btnValue) || btnValue === '.') {
        currentInput += btnValue;
        screen.innerText = currentInput;
    }
    // script.js 中，繼續在上面的事件監聽器中加入

    else if (btnValue === '複製結果') {
        const textarea = document.createElement('textarea');
        textarea.value = screen.innerText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    else {
        switch (btnValue) {
            case 'AC':
                currentInput = "";
                previousInput = "";
                action = null;
                screen.innerText = "0";
                break;
            case '+':
            case '−':
            case '×':
            case '÷':
                if (action) {
                    compute();
                }
                previousInput = currentInput;
                currentInput = "";
                action = btnValue;
                break;
            case '=':
                compute();
                break;
            default:
                break;
        }
    }
});

function compute() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (action) {
        case '+':
            result = prev + curr;
            break;
        case '−':
            result = prev - curr;
            break;
        case '×':
            result = prev * curr;
            break;
        case '÷':
            if (curr !== 0) {
                result = prev / curr;
            } else {
                result = "錯誤";
            }
            break;
        default:
            return;
    }

    screen.innerText = result.toString();
    currentInput = result.toString();
    action = null;
}
