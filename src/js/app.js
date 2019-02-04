  var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
    });

  function el(element) {
  	return document.getElementById(element);
  }


var loop = false;

function randInt(){
return Math.floor(Math.random() * (100000000 - 1000 + 1)) + 1000;
}
function randFloat(){
return Math.floor(Math.random() * (500.20 - 110.43 + 1)) + 110.43;
}



function parseQuery(entropy){
	 var d1 = entropy.replace(/randint/g, randInt());
	 var d2 = d1.replace(/randfloat/g, randFloat());
	 return d2;

}


var loopx;

var rcount = 0;
function updateReq(){
	el('rcount').innerHTML = rcount;
	rcount++;
}

function looper(q,speed){
	 loopx = setInterval(f=>{
	axios.get(q).then(res=>{
		 el('send').innerHTML = `<i class="fa fa-check"> SENT!`;
		 	updateReq();
	})
},speed);
}

function sendRequest(){
	var route = el('route').value;
	var speed = parseInt(el('speed').value);
	  if(route){
	  	 var query = parseQuery(route);
        if(loop === true){
        	looper(query,speed);
        }else{
          axios.get(query)
          .then(res=>{
          	updateReq();
          })
        }
	  }else{
	  	alert("no routes declared!");
	  }
}


  el('send').onclick = () =>{
      sendRequest();
  }

  el('aloop').onclick = () =>{
  	 var btn = el('aloop');
  	   if(loop === false){
           btn.innerHTML = `<i class="fa fa-check"></i> Loop Activated`;
           btn.classList.remove("color-8");
           btn.classList.add("color-3");
           el('rmode').innerText = "LOOP MODE";
           loop = true;
  	   }else{
          btn.innerHTML = `<i class="fa fa-circle"></i> Activate Loop`;
          btn.classList.remove("color-3");
           btn.classList.add("color-8");
           el('rmode').innerText = "SINGLE REQUEST MODE";
            el('send').innerHTML = `<i class="fa fa-send"> SEND`;
           loop = false;
           clearInterval(loopx);
  	   }
  }