
 console.log('Loaded!');
 window.onload=function(){
        
         //Move the image
        var img = document.getElementById("image");
        img.onclick=function(){
            img.style.mariginLeft='100px';
          //  var interval=setInterval(movRight,50);
        };  
       
         var button = document.getElementById("counter");
         var counter =0;
         button.onclick = function() {
                counter = counter + 1;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
               };
   
    };