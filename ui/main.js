
 console.log('Loaded!');
 window.onload=function(){
    
 var button = document.getElementById("counter");
 var counter =0;
button.onclick = function() {
    counter = counter + 1;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
        
        
    };
    //Move the image
    var img = document.getElementById("image");
    img.onclick=function(){
        img.style.mariginLeft='100px';
      //  var interval=setInterval(movRight,50);
    }
 };