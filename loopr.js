var express = require('express');
var app = express();
var http = require('http').Server(app);
var os = require('os');
var ifaces = os.networkInterfaces();

app.use(express.static('src'));
app.set('port', (process.env.PORT || 5000));
http.listen(5000);

var banner = `
=====================================
  Loopr v. (0.0.1) Server Running:
=====================================
Connect to Server using Details Below
-------------------------------------       
`;

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }
    console.log(banner); 	
    if (alias >= 1) {
      console.log(ifname + ':' + alias, iface.address +":5000 or localhost:5000");
    } else {
      console.log(ifname, iface.address+":5000 or localhost:5000");
    }
    ++alias;
  });
});

app.get("/test",(req,res)=>{
   console.log(req.query.data);
   res.send("ok");
})

