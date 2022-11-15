
function submitform() {
    console.log("abc")
    

    var ciphertext = CryptoJS.DS.encrypt(document.getElementById("message").value, document.getElementById("password").value).toString();

    


    //"encryptedmessage"
    document.getElementById("encryptedmessage").innerHTML = ciphertext
    var binaryciphertext = text2Binary(ciphertext)
    var messagelength = binaryciphertext.length
    console.log(binaryciphertext)
    console.log(binary2Text(binaryciphertext))
    console.log(messagelength)
    


    //make an array
    var numbers = new Array();
    for (let i = 0; i < volume; i++) {
        numbers[i] = i;
    }
    console.log("This is the numbers array " + numbers)

    //randomize the array
    var ds = shuffle(numbers)

    var ds = ds.slice(0, messagelength)
    console.log("This is the ds " + ds)
    console.log("This is the ds length " + ds.length)

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
                if (ds.includes(addresscounter) == true) {
                    //console.log(addresscounter+" Index :  "+ds.indexOf(addresscounter)+" Actual data : "+binaryciphertext[ds.indexOf(addresscounter)])
                    //input actual data based on the ds
                    cube[i][j][k] = parseInt(binaryciphertext[ds.indexOf(addresscounter)])
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

    //generte final ds object in javascript
    var finalds = {
        dsds: document.getElementById("password").value,
        ds: ds
    }
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalds));


    //download ds
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'ds.json';
    a.innerHTML = 'download JSON plz asap karde bhai';

    var container = document.getElementById('ds');
    container.appendChild(a);




    //make an image
    document.getElementById("inputimage").style.display = "block"
    document.getElementById("inputimagehere").onchange = function () {
        steganography(cube)
    };














    /*decryption code
    This code will decrypt from the ds. 
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
    for (let i = 0; i < ds.length; i++) {
        //may be an error here
        decryptedarray[i] = cube[addressmap[ds[i]][0]][addressmap[ds[i]][1]][addressmap[ds[i]][2]]
    }

    var decryptedtext = binary2Text(decryptedarray.toString().replace(/,/g, ""))

    //ds decrypt

    var bytes = CryptoJS.DS.decrypt(decryptedtext, document.getElementById("password").value);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypted text: " + originalText)



    //Perfectly balanced
}