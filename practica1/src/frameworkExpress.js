import express from "express";
import { rutas } from "./frameworkExpressRutas.js";


const app = express();
const port = 3000;

export const start = () => {
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  app.listen(port, () => console.log("Example app listening on port 3000!"));
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
};


/******* STATICS ********/
app.use(express.static('estaticos'));
/************************/

/******* BASICO ********/
app.get("/", (req, res) => {
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  console.log("app.get -> / ");
  res.send("HOME");
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
});
/************************/


/***** funcion para usar mas abajo como MIDDLEWARE ******/
const mid2 =(req,res,next)=>{
  console.log("\x1b[35m%s\x1b[0m", '-----------------MIDDLEWARE 2------------------')
  next()
}
/************************/


/******* ROUTES ********/
app.use("/rutas", rutas);
/************************/

app.get('/dir*n',(req,res)=>res.send('dir*n'))      // comodines (diran, direccion, etc)
app.get(/.*fly$/,(req, res)=>res.send('/.*fly$/'))  // una ER (butterfly, afly, drangonfly, etc)

/***** MIDDLEWARE-1 ******/
app.get(`/indice`, mid2,(req, res, err) => {  
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  console.log("app.get-> /INDICE (con middleware como parametro)");
  res.json({"rta":"INDEX"});
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
});
/************************/


/***** MIDDLEWARE-2 ******/
const midd = (req,res,next)=>{  
  console.log("\x1b[35m%s\x1b[0m", '-----------------MIDDLEWARE 1------------------')
  next()
}
app.use(midd)
/*************************/

/******** PARAMS ********/
app.get("/params/:param1/:param2", (req, res, err) => {
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  console.log("app.get-> /PARAMS");
  console.log("req.method", req.method);
  console.log("req.params: ", req.params);
  console.log("req.query:", req.query);
  res.send("PARAMS");
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
});
/***********************/


/***** FORMS-POST ******/
app.post("/forms-querys", (req, res, err) => {
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  console.log("app.post-> /FORMS-QUERYS");
  console.log("req.body:", req.body);
  console.log("req.method: ", req.method);
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
});
/***********************/

/***** STATIC ******/
app.get("/get-form", (req, res, err) => {
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  console.log("app.post-> /GET-FORM");
  //  const root = path.join(__dirname, '..', 'src') ---> con MODULES JS  no  funciona la var global "__dirname"
  const url = new URL( import.meta.dirname);
  const {href: root} = new URL( import.meta.dirname)
  console.log('pathname():',url.pathname)
  console.log('href():',url.href)
  console.log( `app.get-> `,root);
  res.status(200).sendFile( root+'\\htmls\\home.html');
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
});
