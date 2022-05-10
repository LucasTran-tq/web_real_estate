function checkLengthName(name) {
    if (name.length >= 3 && name.length <= 50) {
        return true;
    }
    return false;
}
function isNormalCharacter(character) {
    if (character >= 'a' && character <= 'z') {
        return true;
    }
    return false;
}
function isCapitalCharacter(character) {
    if (character >= 'A' && character <= 'Z') {
        return true;
    }
    return false;
}
function isUnicodeCharacter(character) {
    if (character.charCodeAt(0) <= 0 || character.charCodeAt(0) >= 127)
        return true
    return false;
}

export function checkValidName(name) {
    if (!name) {
        return false;
    }
    if (!checkLengthName(name)) {
        console.log("fail name");
        return false;
    }

    for (const character of name) {
        if (character == " ")
            continue;
        if (!isCapitalCharacter(character) && !isNormalCharacter(character) && !isUnicodeCharacter(character)) {
            return false;
        }
    }
    return true;
}