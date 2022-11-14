var click2 = 0;

function speedtest() {
    click2++
    var area = squares[side]
    console.time()
    
    var binaryciphertext = text2Binary(document.getElementById("message").value);
    var side = parseInt(document.getElementById("cubesize").value)
    
    var volume = cubes[side]
    //console.log(side + " " + area + " " + volume)
    var messagelength = binaryciphertext.length

   
    //make an array
    var numbers = new Array(); 
    for (let i = 0; i < volume; i++) {
        numbers[i] = i;
    }
    //console.log("This is the numbers array " + numbers)
    //output.innerHTML = output.innerHTML + "<br><br>" + "Part 1/2_Array creation: <span style='color:green;'>Success</span>"


    //randomize the array
    var key = shuffle(numbers)

    var key = key.slice(0, messagelength)
    

    //creating cube
    var cube = new Array();
    for (let i = 0; i < side; i++) {
        cube[i] = new Array();
        for (let j = 0; j < side; j++) {
            cube[i][j] = new Array();

        }
    }


    //output.innerHTML = output.innerHTML + "<br><br>" + "Creation of cube: <span style='color:green;'>Success</span>"
    //put data in cube
    var addresscounter = 0
    //let tempcounter = 0
    for (let k = 0; k < side; k++) {
        for (let i = 0; i < side; i++) {
            for (let j = 0; j < side; j++) {
                if (key.includes(addresscounter) == true) {
                    //console.log(addresscounter+" Index :  "+key.indexOf(addresscounter)+" Actual data : "+binaryciphertext[key.indexOf(addresscounter)])
                    //input actual data based on the key
                    cube[i][j][k] = parseInt(binaryciphertext[key.indexOf(addresscounter)])
                    //this variable is just for testing purposes
                    //tempcounter++
                } else {
                    //input random data
                    cube[i][j][k] = Math.floor((Math.random() * 2))

                }

                addresscounter++;
            }
        }
    }
    console.timeEnd();
    console.log("Click counter: " + click2)
    console.log(cube)



    //make an address mapper
    console.time()
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
    //console.log(addressmap)

    //extract data from cube
    var decryptedarray = new Array();
    for (let i = 0; i < key.length; i++) {
        //may be an error here
        decryptedarray[i] = cube[addressmap[key[i]][0]][addressmap[key[i]][1]][addressmap[key[i]][2]]
    }

    var decryptedtext = binary2Text(decryptedarray.toString().replace(/,/g, ""))
    console.timeEnd()
    console.log("decrypted text: " + decryptedtext)


}