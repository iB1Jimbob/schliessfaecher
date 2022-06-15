const letters = document.querySelectorAll('input.letter');
for (let i = 0; i < letters.length; i++) {
    // If the max length is reached, focus on the next input
    letters[i].addEventListener('input', function () {
        if (this.value.length >= this.maxLength && letters[i + 1]?.value.length === 0) {
            if (i < letters.length - 1) {
                letters[i + 1].focus();
            }
        }
    });
    // If the backspace key is pressed and the input is empty, focus on the previous input
    letters[i].addEventListener('keydown', function (e) {
        const BACKSPACE_KEYCODE = 8;
        const ARROW_LEFT_KEYCODE = 37;
        const ARROW_RIGHT_KEYCODE = 39;

        if (e.keyCode === BACKSPACE_KEYCODE) {
            if (this.value.length === 0) {
                if (i > 0) {
                    letters[i - 1].focus();
                    e.preventDefault();
                }
            }
        }
        if (e.keyCode === ARROW_LEFT_KEYCODE && this.selectionStart === 0) {
            if (i > 0) {
                letters[i - 1].focus();
                e.preventDefault();
            }
        }
        if (e.keyCode === ARROW_RIGHT_KEYCODE && this.selectionEnd === this.value.length) {
            if (i < letters.length - 1) {
                letters[i + 1].focus();
                e.preventDefault();
            }
        }
    });
}

// On enter skip to nest input that is not a date or a radio button or a checkbox
const inputs = document.querySelectorAll('input');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keydown', function (e) {
        const ENTER_KEYCODE = 13;
        if (e.keyCode === ENTER_KEYCODE) {
            if (inputs[i + 1]?.type !== 'date' && inputs[i + 1]?.type !== 'radio' && inputs[i + 1]?.type !== 'checkbox') {
                inputs[i + 1].focus();
                e.preventDefault();
            }
        }
    });
}
function getIBAN() {
    const letters = document.querySelectorAll('input.iban.letter');
    let iban = 'DE';
    for (const letter of letters) {
        iban += letter.value;
        if (letter.nextElementSibling.tagName === 'P') {
            iban += ' ';
        }
    }
    return iban;
}