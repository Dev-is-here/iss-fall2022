 //start



 var json;
 var cube=new Array();

 document.getElementById('files').addEventListener('change', handleFileSelect, false);

 function handleFileSelect(evt) {
     var files = evt.target.files; // FileList object

     // files is a FileList of File objects. List some properties.
     var output = [];
     for (var i = 0, f; f = files[i]; i++) {
         var reader = new FileReader();

         // Closure to capture the file information.
         reader.onload = (function (theFile) {
             return function (e) {

                 try {
                     json = JSON.parse(e.target.result);
                     if (json.key != undefined & json.aeskey != undefined) {
                         document.getElementById("accepted").innerHTML = "<p><scan style='color:green;'>Key accepted!</span></p>";
                     }
                     else {
                        document.getElementById("accepted").innerHTML = "<p><scan style='color:red;'>Error! No key detected.</span></p>";
                     }
                 } catch (ex) {
                     alert('error');
                 }
             }
         })(f);
         reader.readAsText(f);
     }

 }

 document.getElementById('files').addEventListener('change', handleFileSelect, false);


 //accept encrypted image  
 function previewFile() {
    const preview = document.getElementById('scream');
    const file = document.getElementById('inputimagehere').files[0];
    const reader = new FileReader();
    console.log(file);
    reader.addEventListener("load", function () {
        // convert image file to base64 string

        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

document.getElementById("scream").onload = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    c.height=img.height
    c.width=img.width
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);

    
    var i;
    var onepixel;
    var n=0;
    for (i = 0; i < imgData.data.length; i += 4) {
        if(n<json.volume){
        onepixel=dec2bin(imgData.data[i + 2])
        
        cube.push(onepixel[7])
        }
        n++
        
    }
    console.log(cube)
    //decryption
    var decryptedarray = new Array();
    for (let m = 0; m < json.key.length; m++) {
        //may be an error here
        decryptedarray[m] = cube[json.key[m]]
    }
    console.log(decryptedarray)
    var decryptedtext = binary2Text(decryptedarray.toString().replace(/,/g, ""))

    //aes decrypt

    var bytes = CryptoJS.AES.decrypt(decryptedtext, json.aeskey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypted text: " + originalText)
    
    document.getElementById("output").innerHTML ="<p>Decrypted text: "+originalText+"</p>"

  
};



















