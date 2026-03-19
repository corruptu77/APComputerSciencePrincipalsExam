
/*
2 functions: encrypt and decrypt
        Encrypt: Picks a random number, that number is the set base, is kept as a variable. 
            When the code gets to a new word it chooses another number.
            The number should be 1 to 26. 
            Each letter of the alphabet should have a set number [A = 1, B = 2, C = 3, etc...]
            The base number is added to the last letter [ABCDE => 12345] => [base = 3, 5+3=8]
            That letter is added to the previous letter as well [ABCDE => 12345] => [base = 10, 5+10=15
                                                                                            4+15=19]
            This keeps going until the first letter is exchanged [ABCDE base = 10; A = 1, B = 2, C = 3, D = 4, E = 5,
                                                                        5+10=15
                                                                        15+4=19
                                                                        19+3=22
                                                                        22+2=24
                                                                        24+1=25
                                                                        base=10]
            Now convert the new numbers (including the base number) into letters. Any number greater than 26 is subtracted by 26. The base number then becomes the first number.
                                                                        [10 = J 
                                                                        15 = O 
                                                                        19 = S 
                                                                        22 = V 
                                                                        24 = X 
                                                                        25 = Y]
                ABCDE => JOSVXY
            The encrypted word now is placed into another variable. When all the words have been encrypted, it exports it.
        Decrypt: Will take the first letter of the encrypted word (Is not actually part of the word, but is part of the key. The first letter is the base number)
            Find the associated number that comes with the first number [1 = A, 2 = B, 3 = C, etc...]
            Do the same for the other letters, convert into numbers. [JOSVXY = 10, 15, 19, 22, 24, 25]
            subtract the base number from all the associated numbers [
                                                                        15-10=5
                                                                        19=10=9
                                                                        22-10=12
                                                                        24-10=14
                                                                        25-10=15
            ]
            If there is a number less than 1, add 26 to the number.
            Then, take the last number, and subtract it by the previous number, but keep the previous number. Repeat until the first letter, which you don't do anything[
                                                                        15-14=1
                                                                        14-12=2
                                                                        12-9=3
                                                                        9-5=4
                                                                        5=5
            ]
            Convert the new numbers into letters [1=A,2=B,3=C,4=D,5=E, code = ABCDE]
            */

// Simple encryption and decryption script
var crypt = {};
for (var i = 0; i < 26; i++) {
    crypt[String.fromCharCode(97 + i)] = i + 1;
}

function encrypt(word) {
    var base = Math.floor(Math.random() * 26) + 1;
    var nums = [];
    for (var i = 0; i < word.length; i++) {
        nums.push(crypt[word[i].toLowerCase()]);
    }
    var encrypted_nums = [];
    var current = nums[nums.length - 1] + base;
    encrypted_nums.push(current);
    for (var i = nums.length - 2; i >= 0; i--) {
        current = nums[i] + current;
        encrypted_nums.push(current);
    }
    encrypted_nums.unshift(base);
    var encrypted = "";
    for (var i = 0; i < encrypted_nums.length; i++) {
        var n = encrypted_nums[i];
        while (n > 26) {
            n -= 26;
        }
        if (n === 0) n = 26;
        encrypted += String.fromCharCode(n + 64);
    }
    return encrypted;
}
document.getElementById("encryptButton").addEventListener("click", function() {
    var word = document.getElementById("inputWord").value;
    var encrypted = encrypt(word);
    document.getElementById("encryptedWord").textContent = "Encrypted: " + encrypted;
    var decrypted = decrypt(encrypted);
    document.getElementById("decryptedWord").textContent = "Decrypted: " + decrypted;
});

function decrypt(encrypted) {
    var base = crypt[encrypted[0].toLowerCase()];
    var nums = [];
    for (var i = 1; i < encrypted.length; i++) {
        nums.push(crypt[encrypted[i].toLowerCase()]);
    }
    // subtract base
    for (var i = 0; i < nums.length; i++) {
        nums[i] -= base;
        if (nums[i] < 1) {
            nums[i] += 26;
        }
    }
    // now compute differences
    var decrypted_nums = [];
    decrypted_nums.push(nums[nums.length - 1]);
    for (var i = nums.length - 2; i >= 0; i--) {
        decrypted_nums.push(nums[i] - decrypted_nums[decrypted_nums.length - 1]);
    }
    decrypted_nums.reverse();
    var decrypted = "";
    for (var i = 0; i < decrypted_nums.length; i++) {
        var n = decrypted_nums[i];
        if (n < 1) n += 26;
        while (n > 26) {
            n -= 26;
        }
        decrypted += String.fromCharCode(n + 64);
    }
    return decrypted;
    var original_nums = [];
    for (var i = nums.length - 1; i > 0; i--) {
        original_nums.push(nums[i] - nums[i - 1]);
    }
    original_nums.push(nums[0]);
    var decrypted = "";
    for (var i = 0; i < original_nums.length; i++) {
        decrypted += String.fromCharCode(original_nums[i] + 64);
    }
    return decrypted;
}
document.getElementById("decryptButton").addEventListener("click", function() {
    var encrypted = document.getElementById("inputWord").value;
    var decrypted = decrypt(encrypted);
    document.getElementById("decryptedWord").textContent = "Decrypted: " + decrypted;
});

// Example usage
var word = "ABCDE";
var encrypted = encrypt(word);
console.log("Encrypted:", encrypted);
var decrypted = decrypt(encrypted);
console.log("Decrypted:", decrypted);