const cipher = ["1","2","3","4","5","6","7","8","9","0",
                "q","w","e","r","t","y","u","i","o","p",
                "a","s","d","f","g","h","j","k","l","z",
                "x","c","v","b","n","m","Q","W","E","R",
                "T","Y","U","I","O","P","A","S","D","F",
                "G","H","J","K","L","Z","X","C","V","B",
                "N","M","`","~","!","@","#","$","%","^",
                "&","*","(",")","-","_","+","=","[","]",
                "{","}","|",";",":","'",'"',"<",">",",",
                ".","?","/","À","Á","Â","Ã","Ä","Å","Ɓ",
                "Ç","Ć","Ĉ","Č","Ď","È","É","Ê","Ë","Ě",
                "Ĝ","Ǧ","Ĥ","Ì","Í","Î","Ï","Δ","Ĵ","Ω",
                "Ñ","Ö","Õ","Ô","Ó","Ò","Ø","Ř","ẞ","Ś",
                "Ŝ","Š","Ţ","Ù","Ú","Û","Ü","Ẅ","Ƴ","Ý",
                "Ỳ","à","á","â","ã","ä","ɓ","ç","ć","ĉ",
                "č","ð","è","é","ê","ë","ě","ĝ","ǧ","ĥ",
                "ì","í","î","ï","ǰ","ĵ","ň","ñ","ò","ó",
                "ô","õ","ö","ø","ř","ß","ś","ŝ","š","ț",
                "ù","ú","ẅ","ÿ","ý","ỳ","€","£","¥","₩",
                "○","●","□","■","♤","♡","◇","♧","¡","¿",
                "¤","Σ","◙","◘"];
const textToCrypt = [1,2,3,4,5,6,7,8,9,10,
                    11,12,13,14,15,16,17,18,19,20,
                    21,22,23,24,25,26,27,28,29,30,
                    31,32,33,34,35,36,37,38,39,40,
                    41,42,43,44,45,46,47,48,49,50,
                    51,52,53,54,55,56,57,58,59,60,
                    61,62,63,64,65,66,67,68,69,70,
                    71,72,73,74,75,76,77,78,79,80,
                    81,82,83,84,85,86,87,88,89,90,
                    91,92,93,94,95,96,97,98,99,100,
                    101,102,103,104,105,106,107,108,109,110,
                    111,112,113,114,115,116,117,118,119,120,
                    121,122,123,124,125,126,127,128,129,130,
                    131,132,133,134,135,136,137,138,139,140,
                    141,142,143,144,145,146,147,148,149,150,
                    151,152,153,154,155,156,157,158,159,160,
                    161,162,163,164,165,166,167,168,169,170,
                    171,172,173,174,175,176,177,178,179,180,
                    181,182,183,184,185,186,187,188,189,190,
                    191,192,193,194,195,196,197,198,199,200,
                    201,202,203,204];

function encrypt(sentence) {
  var wordCount = sentence.split(" ").length;
  var words = sentence.split(" ");
  var encryptedSentence = "";
  for (var i = 0; i < wordCount; i ++) {
    var base = Math.floor(Math.random() * 204) + 1;
    var currentWord = words[i];
    var letters = currentWord.split("");
    var nums = [];
    
    for (var i2 = 0; i2 < letters.length; i2++) {
      if (letters[i2] === " ") continue; 
      for (var i3 = 0; i3 < 204; i3++) {
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
      while (encryptedNums[i2] > 204) {
        encryptedNums[i2] -= 204;
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

function decrypt(sentence) {
  var wordCount = sentence.split(" ").length;
  var words = sentence.split(" ");
  var decryptedSentence = "";
  
  for (var i = 0; i < wordCount; i++) {
    var currentWord = words[i];
    if (currentWord.length === 0) continue;
    
    var letters = currentWord.split("");
    
    var baseLetter = letters[0];
    var base = 0;
    for (var i2 = 0; i2 < 204; i2++) {
      if (baseLetter === cipher[i2]) {
        base = textToCrypt[i2];
        break;
      }
    }
    
    var encryptedNums = [];
    for (var i2 = 1; i2 < letters.length; i2++) {
      for (var i3 = 0; i3 < 204; i3++) {
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
        decryptedNums[i2] += 204;
      }
      while (decryptedNums[i2] > 204) {
        decryptedNums[i2] -= 204;
      }
    }
    
    
    decryptedNums.reverse();
    
    
    for (var i2 = 0; i2 < decryptedNums.length; i2++) {
      var num = decryptedNums[i2];
      if (num > 0 && num <= 204) {
        decryptedSentence += cipher[num - 1];
      }
    }
    decryptedSentence += " ";
  }
  return decryptedSentence;
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

