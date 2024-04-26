let display_time = () => {
  let d = new Date();
  let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  document.querySelector("#clock").innerText = time;
};

setInterval(display_time, 1000);