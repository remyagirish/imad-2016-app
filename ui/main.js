
 console.log('Loaded!');
 window.onload=function()
 {
        
         var button = document.getElementById("counter");
         var counter =0;
         button.onclick = function()
         {
             //Capture a request to the counter endpoint
             var request = new XMLHttpRequest();
             //capture the response and store it in a variable
             request.onreadystatechange=function()
             {
                 if(request.readyState===XMLHttpRequest.Done)
                 {
                     //Take some action
 
                        var counter= request.responseText;
                        var span = document.getElementById('count');
                        span.innerHTML = counter.toString();
                     }
                 };
                 //Not done yet
             };
            //Make the request
            request.open('GET','http://http://remyagirish.imad.hasura-app.io/counter',true);
            request.send(null);
            
          };
   