console.log('Loaded!');


var button=document.getElementById('counter');
var counter=0;
button.onclick = function(){
  
  //make a request to the counter endpoint;
  //capture the response and store it in a variable
  //render the variable in the correct span
  counter=counter+1;
  var span=document.getElementId('count');
  span.innerHTML=counter.toString();
};