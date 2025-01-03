function encrypt(message) {
    let encryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
        const messageAscii = message.charCodeAt(i);
        const encryptedChar = String.fromCharCode(messageAscii + 6);
        encryptedMessage += encryptedChar;
    }
    return encryptedMessage;
}

function decrypt(message) {
    let decryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
        const encryptedAscii = message.charCodeAt(i);
        const decryptedChar = String.fromCharCode(encryptedAscii - 6);
        decryptedMessage += decryptedChar;
    }
    return decryptedMessage;
}


export { encrypt, decrypt };