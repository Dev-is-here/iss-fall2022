(function (global) {



    var cryptoCube = {



        encrypt:
            //basic encrypt function 
            //take in message, return encytion cube and key
            function (message) {
                if(typeof(message)!="string"){
                    throw "Input not string"
                }

                //convert to binary
                var binaryText = this.text2Binary(message)

                console.log(binaryText)

                //calculate message length
                var messageLength = binaryText.length


                //calculate cubesize
                var side = Math.ceil(Math.cbrt(messageLength)) + 5;
                var volume = side * side * side;

                //make an array
                var numbers = new Array();
                for (let i = 0; i < volume; i++) {
                    numbers[i] = i;
                }
                //console.log("This is the numbers array " + numbers)
                //output.innerHTML = output.innerHTML + "<br><br>" + "Part 1/2_Array creation: <span style='color:green;'>Success</span>"


                //randomize the array
                var key = this.shuffle(numbers)

                var key = key.slice(0, messageLength)
                //console.log("This is the key " + key)
                //console.log("This is the key length " + key.length)
                //output.innerHTML = output.innerHTML + "<br><br>" + "Part 2/2_Randomize array: <span style='color:green;'>Success</span>"

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
                var addressCounter = 0
                //let tempcounter = 0
                for (let k = 0; k < side; k++) {
                    for (let i = 0; i < side; i++) {
                        for (let j = 0; j < side; j++) {
                            if (key.includes(addressCounter) == true) {
                                //console.log(addressCounter+" Index :  "+key.indexOf(addressCounter)+" Actual data : "+binaryText[key.indexOf(addressCounter)])
                                //input actual data based on the key
                                cube[i][j][k] = parseInt(binaryText[key.indexOf(addressCounter)])
                                //this variable is just for testing purposes
                                //tempcounter++
                            } else {
                                //input random data
                                cube[i][j][k] = Math.floor((Math.random() * 2))

                            }

                            addressCounter++;
                        }
                    }
                }


                return {
                    cube: cube,
                    key: {
                        key: key,
                        side: side
                    }
                };



            },


        decrypt: function (cube, inputkey) {
            

            var key=inputkey.key;
            var side=inputkey.side;
            if(typeof(cube)!="object" || typeof(inputkey)!="object" || key==undefined || side==undefined){
                throw "Input not valid"
            }
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

            var decryptedtext = this.binary2Text(decryptedarray.toString().replace(/,/g, ""))
            
            console.log("decrypted text: " + decryptedtext)
            return decryptedtext;


        },

        shuffle: function (array) {
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
        },




        text2Binary: function (input) {
            /*
            *return string.split('').map(function (char) {
            *return char.charCodeAt(0).toString(2);
            *}).join('');

            */

            var result = "";
            for (var i = 0; i < input.length; i++) {
                var bin = input[i].charCodeAt().toString(2);
                result += Array(8 - bin.length + 1).join("0") + bin;
            }
            return result;


        },

        //convert binay to text
        binary2Text: function (input) {
            if (typeof(input)!= "string" || /[^01]/g.test(input)==true){
                throw "Invalid input"
            }
            var result = "";
            var arr = input.match(/.{1,8}/g);
            for (var i = 0; i < arr.length; i++) {
                result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
            }
            return result;
        },

        //dec to binary only for numbers till 255 for color coding
        //output in binary..string format
        dec2bin: function (dec) {

            if (dec>255 || dec<0 || typeof(dec)!= "number" ){
                throw "Invalid input"
            }
            var zero = "0"

            var num = (dec >>> 0).toString(2);
            var numlength = num.length
            if (num.length != 8) {
                for (let i = 0; i < (8 - numlength); i++) {
                    num = zero + num;
                }
            }
            return num

        },

        //binary to decimal
        bin2dec: function (bstr) {
            if (typeof(bstr)!= "string" || /[^01]/g.test(bstr)==true){
                throw "Invalid input"
            }
            return parseInt((bstr + '')
                .replace(/[^01]/gi, ''), 2);
        },

        cubeSize: function (message) {

            //console.log(this.text2Binary(message))
            //increase the number at the last to increase cubesize for more secure encryptions
            return Math.ceil(Math.cbrt(this.text2Binary(message).length)) + 5;
        },




    }



    //save some typing
    global.cryptoCube = global.CC = cryptoCube;

}(window));