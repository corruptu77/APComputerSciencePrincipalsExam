const cipher = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const textToCrypt = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

function encryptOnce(sentence) {
  // Helper function to encrypt a sentence once
  sentence = sentence.toLowerCase();
  var wordCount = sentence.split(" ").length;
  var words = sentence.split(" ");
  var encryptedSentence = "";
  
  for (var i = 0; i < wordCount; i ++) {
    var base = Math.floor(Math.random() * 26) + 1;
    var currentWord = words[i];
    var letters = currentWord.split("");
    var nums = [];
  
    for (var i2 = 0; i2 < letters.length; i2++) {
      if (letters[i2] === " ") continue; 
      for (var i3 = 0; i3 < 26; i3++) {
        if (letters[i2] === cipher[i3]) {
          nums.push(textToCrypt[i3]);
          break;
        }
      }
    }
  
    if (nums.length === 0) continue;
  
    var encryptedNums = [];
    var current = nums[nums.length - 1] + base;
    encryptedNums.push(current);
    for (var i2 = nums.length - 2; i2 >= 0; i2--) {
      current = nums[i2] + current;
      encryptedNums.push(current);
    }
    encryptedNums.unshift(base);
  
    for (var i2 = 0; i2 < encryptedNums.length; i2++) {
      while (encryptedNums[i2] > 26) {
        encryptedNums[i2] -= 26;
      }
    }
  
    for (var i2 = 0; i2 < encryptedNums.length; i2++) {
      var num = encryptedNums[i2];
      encryptedSentence += cipher[num - 1];
    }
    encryptedSentence += " ";
  }
  return encryptedSentence;
}

function encrypt(sentence) {
  sentence = sentence.toLowerCase();
  sentence = sentence.replace(/[^a-z ]/g, "");
  
  var stackCount = 0;
  var startIndex = 0;
  
  // Check if text starts with format: "a word..." (single letter + space = already encrypted)
  if (sentence.length > 2) {
    var firstChar = sentence.charAt(0);
    var spaceIndex = sentence.indexOf(' ');
    
    // If first char is a-z and there's a space right after, it's encrypted text (stack count)
    if ((firstChar >= 'a' && firstChar <= 'z') && spaceIndex === 1) {
      stackCount = firstChar.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
      startIndex = 2; // Skip the letter and space
    }
  }
  
  // Extract the text to encrypt (without the stack count)
  var textToEncrypt = sentence.substring(startIndex).trim();
  
  // Encrypt the text once
  var encryptedOnce = encryptOnce(textToEncrypt);
  
  // Increment stack count
  stackCount++;
  
  // Only add stack count letter if this was already encrypted (stackCount > 1)
  if (stackCount > 1) {
    var stackLetter = cipher[stackCount - 1];
    return stackLetter + " " + encryptedOnce;
  } else {
    // First-time encryption: just return the encrypted text (without stack count prefix)
    return encryptedOnce;
  }
}

function decryptOnce(sentence) {
  sentence = sentence.toLowerCase();
  var wordCount = sentence.split(" ").length;
  var words = sentence.split(" ");
  var decryptedSentence = "";
  
  for (var i = 0; i < wordCount; i++) {
    var currentWord = words[i];
    if (currentWord.length === 0) continue;
    
    var letters = currentWord.split("");
    
    var baseLetter = letters[0];
    var base = 0;
    for (var i2 = 0; i2 < 26; i2++) {
      if (baseLetter === cipher[i2]) {
        base = textToCrypt[i2];
        break;
      }
    }
    
    var encryptedNums = [];
    for (var i2 = 1; i2 < letters.length; i2++) {
      for (var i3 = 0; i3 < 26; i3++) {
        if (letters[i2] === cipher[i3]) {
          encryptedNums.push(textToCrypt[i3]);
          break;
        }
      }
    }
    
    var decryptedNums = [];
    for (var i2 = 0; i2 < encryptedNums.length; i2++) {
      if (i2 === 0) {
        decryptedNums.push(encryptedNums[i2] - base);
      } else {
        decryptedNums.push(encryptedNums[i2] - encryptedNums[i2 - 1]);
      }
    }
    
    for (var i2 = 0; i2 < decryptedNums.length; i2++) {
      if (decryptedNums[i2] < 1) {
        decryptedNums[i2] += 26;
      }
      while (decryptedNums[i2] > 26) {
        decryptedNums[i2] -= 26;
      }
    }
    
    decryptedNums.reverse();
    
    for (var i2 = 0; i2 < decryptedNums.length; i2++) {
      var num = decryptedNums[i2];
      if (num > 0 && num <= 26) {
        decryptedSentence += cipher[num - 1];
      }
    }
    decryptedSentence += " ";
  }
  return decryptedSentence;
}

function decrypt(sentence) {
  sentence = sentence.toLowerCase();
  var stackCount = 1; // Default to 1 encryption if no stack count found
  var textToDecrypt = sentence;
  
  // Check if text starts with format: "a word..." (single letter + space = has stack count)
  if (sentence.length > 2) {
    var firstChar = sentence.charAt(0);
    var spaceIndex = sentence.indexOf(' ');
    
    if ((firstChar >= 'a' && firstChar <= 'z') && spaceIndex === 1) {
      stackCount = firstChar.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
      textToDecrypt = sentence.substring(2);
    }
  }
  
  for (var i = 0; i < stackCount; i++) {
    textToDecrypt = decryptOnce(textToDecrypt);
  }
  
  return textToDecrypt.trim();
}

document.getElementById("encryptButton").addEventListener("click", function() {
var sentence = document.getElementById("inputEncryption").value;
var encrypted = encrypt(sentence);
document.getElementById("encryptedWordOutput").textContent = encrypted;
});

document.getElementById("decryptButton").addEventListener("click", function() {
var sentence = document.getElementById("inputDecryption").value;
var decrypted = decrypt(sentence);
document.getElementById("decryptedWordOutput").textContent = decrypted;
});

