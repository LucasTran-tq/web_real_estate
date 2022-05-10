function validIdentityNumber(identityNumber) {
    if (!identityNumber) {
        return false;
    }
    for (let i = 0; i < identityNumber.length; i++) {
        if (identityNumber[i] < '0' || identityNumber[i] > '9') {
            return false;
        }
    }
    return true;
}
export function checkValidIdentity(identityNumber) {
    if (!validIdentityNumber(identityNumber))
        return false;
    return (identityNumber.length == 9 || identityNumber.length == 12)
}