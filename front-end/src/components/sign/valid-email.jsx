var exception = ['@', '.'];

function isAlphabet(character) {
    if (character >= 'a' && character <= 'z' || exception.includes(character))
        return true;
    return false;
}
function isNumber(character) {
    if (character >= '0' && character <= '9' || exception.includes(character))
        return true;
    return false;
}
function checkAlphabetAndNumber(email) {
    for (let i = 0; i < email.length; i++) {
        if (!isAlphabet(email[i]) && !isNumber(email[i]))
            return false;
    }
    return true;
}
function checkAddSymbol(email) {
    if (email[0] == '@')
        return false;
    if (email[email.length - 1] == '@')
        return false;
    let countAdd = 0;
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '@')
            countAdd++;
    }
    return countAdd == 1;
}
function checkOther(email) {
    if (!checkAddSymbol(email))
        return false;
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '@') {
            if (email[i + 1] == '.') {
                return false;
            }
        }

        if (email[i] == '.') {
            if (i == email.length - 1)
                continue;
            if (email[i + 1] == '.' || email[i + 1] == '@')
                return false;
        }
    }
    return true;
}
function checkCapital(email) {
    for (let i = 0; i < email.length; i++) {
        if (email[i] >= 'A' && email[i] <= 'Z')
            return false
    }
    return true;
}
function checkUniCode(email) {

    for (let i = 0; i < email.length; i++) {
        if (email[i].charCodeAt(0) <= 0 || email[i].charCodeAt(0) >= 127)
            return false
    }
    return true;
}
function checkSpecialCharacter(email) {
    if (checkAlphabetAndNumber(email))
        return true;
    else {

        for (let i = 0; i < email.length; i++) {
            if (email[i] === '.' || email[i] === '@')
                continue;
            else {
                return false;
            }
        }
    }
    return true;
}
function checkEmailLength(email) {
    return email.length <= 254;
}
export function checkValidEmail(email) {
    if(!email)
        return false;
    return checkAlphabetAndNumber(email)
        && checkAddSymbol(email)
        && checkOther(email)
        && checkCapital(email)
        && checkUniCode(email)
        && checkSpecialCharacter(email)
        && checkEmailLength(email);
}