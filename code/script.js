const cipher = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const textToCrypt = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
function encrypt(sentence) {
  sentence = sentence.toLowerCase();
  var base = 0;
  var baseLetter = "text";
  var wordCount = sentence.split(" ").length;
  var words = sentence.split(" ");
  var encryptedSentence = "";
  for (var i = 0; i < wordCount; i ++) {
    base = Math.floor(Math.random() * 26) + 1;
    var currentWord = words[i];
    var letters = currentWord.split("");
    for (var i2 = 0; i2 < wordCount; i2 ++) {
      var currentLetter = letters[i2];
      var crypt = [];
      for (var i3 = 1; i3 < 27; i3 ++) {
        if (currentLetter === cipher[i3]) {
          crypt.push(textToCrypt[i3]);
        }
      }
    }
    var encryption1 = [];
    for (var i2 = 0; i2<crypt.length; i2++) {
      encryption1[i2] = crypt[i2]+base;
    }
    var encryption2 = [];
    for (var i2 = 0; i2<crypt.length; i2++) {
      encryption2[crypt.length - i2] = encryption1[crypt.length - i2]+encryption2[crypt.length - (i2-1)];
      for (var i3 = 0; i3<encryption2.length; i3++) {
        if (encryption2[i3]>26) {
          while (encryption2[i3]>26) {
            encryption2[i3] = encryption2[i3] - 26;
          }
        }
      }
    }
    var terces = [];
    for (var i2 = 0; i2<crypt.length; i2++) {
      var currentNumber = encryption2[i2];
      for (var i3 = 1; i3 < 27; i3 ++) {
        if (currentNumber === textToCrypt[i3]){
          terces.push(cipher[i3]);
        }
      }
    }
    for (var i2 = 1; i2<27; i2 ++) {
      if (base === textToCrypt[i2]) {
        baseLetter = cipher[i2];
      }
    }
    encryptedSentence += baseLetter;
    for (var i2 = 0; i2<crypt.length; i2++) {
      encryptedSentence += terces[i2];
    }
    encryptedSentence += " ";
  }
  return encryptedSentence;
}

function decrypt(crypt) {
  crypt = crypt.toLowerCase();
  var base = 0;
  var wordCount = crypt.split(" ").length;
  var words = crypt.split(" ");
  var decryptedSentence = "";
  for (var i=0; i<wordCount; i++) {
    var currentWord = words[i];
    var letters = currentWord.split("");
    for (var i2=0; i2<letters.length; i2 ++) {
      var decrypt = [];
      if (i2===1) {
        for (var i3=1; i3<27; i3++) {
          if (letters[i]===cipher[i3]) {
            base = textToCrypt[i3];
          }
        } 
      } else {
        for (var i3=1; i3<27; i3++) {
          if (letters[i]===cipher[i3]) {
            decrypt.push(textToCrypt[i3]);
          }
        }
      }
    }
    var decryption1 = [];
    for (var i2 = 0; i2 < decrypt.length; i ++) {
      decryption1[i2] = decrypt[i2] - base;
    }
    var decryption2 = [];
    for (var i2 = 0; i2 < decrypt.length; i ++) {
      decryption2[decrypt.length - i2]=decryption1[decrypt.length - i2] - decryption1[decrypt.length - (i2 + 1)];
      for (var i3 = 0; i3 < decryption2.length; i3 ++) {
        if (decryption2[i3]<1) {
          while (decryption2[i3<1]) {
            decryption2[i3] = decryption2[i3] + 26;
          }
        }
      }
    }
    var terces = [];
    for (var i2=0; i2 < decrypt.length; i2++) {
      var currentNumber = decryption2[i2];
      for (var i3=1; i3<27; i3++) {
        if (currentNumber === textToCrypt[i3]) {
          terces.push(cipher[i3]);
        }
      }
    }
    for (var i2=0; i2 < decrypt.length; i2++) {
      decryptedSentence += terces[i2];
    }
    decryptedSentence += " ";
  }
  return(decryptedSentence);
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