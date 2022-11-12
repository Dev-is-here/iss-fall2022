
function submitform() {
    console.log("abc")
    // Encrypt to AES
    var ciphertext = CryptoJS.AES.encrypt(document.getElementById("message").value, document.getElementById("password").value).toString();

    // Decrypt from AES
    /*
    var bytes = CryptoJS.AES.decrypt(ciphertext, document.getElementById("password").value);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText)
    */


    //"encryptedmessage"
    document.getElementById("encryptedmessage").innerHTML = ciphertext
    var binaryciphertext = text2Binary(ciphertext)
    var messagelength = binaryciphertext.length
    console.log(binaryciphertext)
    console.log(binary2Text(binaryciphertext))
    console.log(messagelength)
    //padding 

    /*
    while (binaryciphertext.length < 3375) {
        randomdigit = Math.floor((Math.random() * 2)).toString();
        binaryciphertext = binaryciphertext.concat(randomdigit) 
    }

    console.log(binaryciphertext)
    console.log(binaryciphertext.length)

    */



    //make an array
    var numbers = new Array();
    for (let i = 0; i < volume; i++) {
        numbers[i] = i;
    }
    console.log("This is the numbers array " + numbers)

    //randomize the array
    var key = shuffle(numbers)

    var key = key.slice(0, messagelength)
    console.log("This is the key " + key)
    console.log("This is the key length " + key.length)

    //creating cube
    var cube = new Array();
    for (let i = 0; i < side; i++) {
        cube[i] = new Array();
        for (let j = 0; j < side; j++) {
            cube[i][j] = new Array();
        }
    }

    //put data in cube
    var addresscounter = 0
    let tempcounter = 0
    for (let k = 0; k < side; k++) {
        for (let i = 0; i < side; i++) {
            for (let j = 0; j < side; j++) {
                if (key.includes(addresscounter) == true) {
                    //console.log(addresscounter+" Index :  "+key.indexOf(addresscounter)+" Actual data : "+binaryciphertext[key.indexOf(addresscounter)])
                    //input actual data based on the key
                    cube[i][j][k] = parseInt(binaryciphertext[key.indexOf(addresscounter)])
                    //this variable is just for testing purposes
                    tempcounter++
                } else {
                    //input random data
                    cube[i][j][k] = Math.floor((Math.random() * 2))

                }

                addresscounter++;
            }
        }
    }
    console.log(cube)

    //Plot Graph
    document.getElementById("plotgraph").style.display = "block"
    document.getElementById("plotgraph").onclick = function () {
        plotGraph(cube)
    };

    //generte final key object in javascript
    var finalkey = {
        aeskey: document.getElementById("password").value,
        key: key
    }
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalkey));


    //download key
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'key.json';
    a.innerHTML = 'download JSON plz asap karde bhai';

    var container = document.getElementById('key');
    container.appendChild(a);




    //make an image
    document.getElementById("inputimage").style.display = "block"
    document.getElementById("inputimagehere").onchange = function () {
        steganography(cube)
    };














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



    //Perfectly balanced
}