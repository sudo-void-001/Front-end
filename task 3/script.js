// Modal
var m = document.getElementById("modal");
document.getElementById("open-modal-btn").addEventListener("click", function(){ m.classList.add("active") });
document.getElementById("close-modal").addEventListener("click", function(){ m.classList.remove("active") });
window.addEventListener("click", function(e){ if(e.target===m) m.classList.remove("active") });

// Accordion
document.querySelectorAll(".faq-q").forEach(function(q){
  q.addEventListener("click", function(){ q.parentElement.classList.toggle("active") });
});

// Form
var f=document.getElementById("contact-form"),
  fi={name:document.getElementById("name"),email:document.getElementById("email"),message:document.getElementById("message")},
  er={name:document.getElementById("name-error"),email:document.getElementById("email-error"),message:document.getElementById("message-error")},
  ok=document.getElementById("form-success");

f.addEventListener("submit",function(e){
  e.preventDefault(); var v=true,
  val={name:fi.name.value.trim(),email:fi.email.value.trim(),message:fi.message.value.trim()};
  for(var k in er){er[k].textContent="";fi[k].classList.remove("invalid")} ok.style.display="none";
  if(!val.name){er.name.textContent="Please enter your name.";fi.name.classList.add("invalid");v=false}
  if(!val.email){er.email.textContent="Please enter your email.";fi.email.classList.add("invalid");v=false}
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.email)){er.email.textContent="Please enter a valid email.";fi.email.classList.add("invalid");v=false}
  if(!val.message){er.message.textContent="Please enter your message.";fi.message.classList.add("invalid");v=false}
  if(v){ok.textContent="Message submitted successfully for this demo.";ok.style.display="block";f.reset()}
});

// Typewriter
var t=document.getElementById("hero-title"),txt=t.textContent,i=0;t.textContent="";
function type(){if(i<txt.length){t.textContent+=txt.charAt(i++);setTimeout(type,Math.random()*50+35)}}
setTimeout(type,300);

// Reveal
var obs=new IntersectionObserver(function(en,o){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("active");o.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(function(el){obs.observe(el)});

// Scroll ring
var ring=document.getElementById("ring-fill"),wrap=document.getElementById("scroll-ring");
window.addEventListener("scroll",function(){
  var p=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight);
  ring.style.strokeDashoffset=126-(p*126);
  wrap.classList.toggle("visible",window.scrollY>250);
});
wrap.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});

// Gallery drag
var tr=document.querySelector(".gallery-track"),d=false,sx,sl;
tr.addEventListener("mousedown",function(e){d=true;sx=e.pageX-tr.offsetLeft;sl=tr.scrollLeft;tr.style.cursor="grabbing"});
tr.addEventListener("mouseleave",function(){d=false;tr.style.cursor="grab"});
tr.addEventListener("mouseup",function(){d=false;tr.style.cursor="grab"});
tr.addEventListener("mousemove",function(e){if(!d)return;e.preventDefault();tr.scrollLeft=sl-(e.pageX-tr.offsetLeft-sx)});
