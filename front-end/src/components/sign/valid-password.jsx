
function checkPasswordLength(password) {

    return password.length >= 6;
}
function checkCapitalCharacter(password) {
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'A' && password[i] <= 'Z')
            return true;
    }
    return false;
}
function checkNumberCharacter(password) {
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= '0' && password[i] <= '9')
            return true;
    }
    return false;
}
export function checkValidPassword(password) {
    if (!password)
        return false;
    return checkPasswordLength(password) && checkCapitalCharacter(password) && checkNumberCharacter(password);
}