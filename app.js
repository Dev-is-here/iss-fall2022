var randomdigit = 0
var side = 37
//squares and cubes only upto 150.
var squares = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1089, 1156, 1225, 1296, 1369, 1444, 1521, 1600, 1681, 1764, 1849, 1936, 2025, 2116, 2209, 2304, 2401, 2500, 2601, 2704, 2809, 2916, 3025, 3136, 3249, 3364, 3481, 3600, 3721, 3844, 3969, 4096, 4225, 4356, 4489, 4624, 4761, 4900, 5041, 5184, 5329, 5476, 5625, 5776, 5929, 6084, 6241, 6400, 6561, 6724, 6889, 7056, 7225, 7396, 7569, 7744, 7921, 8100, 8281, 8464, 8649, 8836, 9025, 9216, 9409, 9604, 9801, 1e4, 10201, 10404, 10609, 10816, 11025, 11236, 11449, 11664, 11881, 12100, 12321, 12544, 12769, 12996, 13225, 13456, 13689, 13924, 14161, 14400, 14641, 14884, 15129, 15376, 15625, 15876, 16129, 16384, 16641, 16900, 17161, 17424, 17689, 17956, 18225, 18496, 18769, 19044, 19321, 19600, 19881, 20164, 20449, 20736, 21025, 21316, 21609, 21904, 22201];
var cubes = [0, 1, 8, 27, 64, 125, 216, 343, 512, 729, 1e3, 1331, 1728, 2197, 2744, 3375, 4096, 4913, 5832, 6859, 8e3, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27e3, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64e3, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125e3, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216e3, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343e3, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512e3, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729e3, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 1e6, 1030301, 1061208, 1092727, 1124864, 1157625, 1191016, 1225043, 1259712, 1295029, 1331e3, 1367631, 1404928, 1442897, 1481544, 1520875, 1560896, 1601613, 1643032, 1685159, 1728e3, 1771561, 1815848, 1860867, 1906624, 1953125, 2000376, 2048383, 2097152, 2146689, 2197e3, 2248091, 2299968, 2352637, 2406104, 2460375, 2515456, 2571353, 2628072, 2685619, 2744e3, 2803221, 2863288, 2924207, 2985984, 3048625, 3112136, 3176523, 3241792, 3307949];
var area = squares[side]
var volume = cubes[side]
console.log(side + " " + area + " " + volume)


/*
//calculate squares and cubes in advance to reduce runtime
for(let i=0;i<150;i++) {
    squares[i]=i*i;
    cubes[i]=i*i*i;
}
console.log(squares)
console.log(cubes)*/

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




//convert text to binary
function text2Binary(input) {
    /*
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('');

    */

    var result = "";
    for (var i = 0; i < input.length; i++) {
        var bin = input[i].charCodeAt().toString(2);
        result += Array(8 - bin.length + 1).join("0") + bin;
    }
    return result;
}

//convert binay to text
function binary2Text(input) {

    var result = "";
    var arr = input.match(/.{1,8}/g);
    for (var i = 0; i < arr.length; i++) {
        result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
    }
    return result;
}

//shuffle elements into an array
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



//Plot Graph
function plotGraph(cube) {
    //PLOT on graph

    //create arrays for axes
    var x_axis = new Array();
    var y_axis = new Array();
    var z_axis = new Array();
    var x_axis2 = new Array();
    var y_axis2 = new Array();
    var z_axis2 = new Array();
    //generate data 

    for (let k = 0; k < side; k++) {
        for (let i = 0; i < side; i++) {
            for (let j = 0; j < side; j++) {
                if (cube[i][j][k] == 1) {
                    x_axis.push(i);
                    y_axis.push(j);
                    z_axis.push(k);

                } else {
                    x_axis2.push(i);
                    y_axis2.push(j);
                    z_axis2.push(k);

                }
            }
        }
    }

    //plot the graph using plot.ly




    var data = [{
        x: x_axis2,
        y: y_axis2,
        z: z_axis2,
        mode: 'markers',
        type: 'scatter3d',
        opacity: 0.5,
        marker: {
            color: 'rgb(23, 190, 207)',
            size: 2
        }
    }, {
        x: x_axis,
        y: y_axis,
        z: z_axis,
        mode: 'markers',
        type: 'scatter3d',
        marker: {
            color: 'red',
            size: 2
        }
    }];

    var layout = {
        autosize: true,
        height: 480,
        scene: {
            aspectratio: {
                x: 1,
                y: 1,
                z: 1
            },
            camera: {
                center: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                eye: {
                    x: 1.25,
                    y: 1.25,
                    z: 1.25
                },
                up: {
                    x: 0,
                    y: 0,
                    z: 1
                }
            },
            xaxis: {
                type: 'linear',
                zeroline: false
            },
            yaxis: {
                type: 'linear',
                zeroline: false
            },
            zaxis: {
                type: 'linear',
                zeroline: false
            }
        },
        title: '3d point clustering',
        width: 477
    };

    Plotly.newPlot('myDiv', data, layout);

}