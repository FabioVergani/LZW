var ABC = {
  toAscii: function(bin) {
    return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
      return String.fromCharCode(parseInt(bin, 2))
    })
  },
  toBinary: function(str, spaceSeparatedOctets) {
    return str.replace(/[\s\S]/g, function(str) {
      str = ABC.zeroPad(str.charCodeAt().toString(2));
      return !1 == spaceSeparatedOctets ? str : str + " "
    })
  },
  zeroPad: function(num) {
    return "00000000".slice(String(num).length) + num
  }
};

var binary1      = "01100110011001010110010101101100011010010110111001100111001000000110110001110101011000110110101101111001",
    binary2      = "01100110 01100101 01100101 01101100 01101001 01101110 01100111 00100000 01101100 01110101 01100011 01101011 01111001",
    binary1Ascii = ABC.toAscii(binary1),
    binary2Ascii = ABC.toAscii(binary2);

console.log("Binary 1:                   " + binary1);
console.log("Binary 1 to ASCII:          " + binary1Ascii);
console.log("Binary 2:                   " + binary2);
console.log("Binary 2 to ASCII:          " + binary2Ascii);
console.log("Ascii to Binary:            " + ABC.toBinary(binary1Ascii));     // default: space-separated octets
console.log("Ascii to Binary /wo spaces: " + ABC.toBinary(binary1Ascii, 0));  // 2nd parameter false to not space-separate octets