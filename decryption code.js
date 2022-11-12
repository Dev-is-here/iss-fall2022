

    /*decryption code
       This code will decrypt from the key. 
       later to be exported to another function
       
       */

    //figure out a way to decide size of cube

    //make an address mapper
    var addressmap = new Array();
    var addressmapindex = 0
    for (let k = 0; k < side; k++) {
        for (let i = 0; i < side; i++) {
            for (let j = 0; j < side; j++) {
                addressmap[addressmapindex] = [i, j, k]
                addressmapindex++;

            }
        }
    }
    console.log(addressmap)

    //extract data from cube
    var decryptedarray = new Array();
    for (let i = 0; i < key.length; i++) {
        //may be an error here
        decryptedarray[i] = cube[addressmap[key[i]][0]][addressmap[key[i]][1]][addressmap[key[i]][2]]
    }

    var decryptedtext = binary2Text(decryptedarray.toString().replace(/,/g, ""))

    //aes decrypt

    var bytes = CryptoJS.AES.decrypt(decryptedtext, document.getElementById("password").value);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypted text: " + originalText)

