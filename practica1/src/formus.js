import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;

app.use(express.static('estaticos'))
app.use(bodyParser.urlencoded({ extended: false })) // formularios con cabecera "Content-type":application/x-www-form-urlencoded
app.use(bodyParser.json())                          // formularios/request con cabecera "Content-type":application/json


/*************** MULTER *********************/
const {href: root} = new URL( import.meta.dirname)
//res.status(200).sendFile( root+'\\htmls\\home.html');
const storage = multer.diskStorage({
  destination: root+'\\uploads',
  filename:(req,file,cb)=>{cb(null,file.originalname)}
})
const uploadFile = multer({
  storage,
  limits:{filesize:1000000}
}).single('imgName')
app.post('/upload',(req,res)=>{
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  console.log("app.get-> /UPLOAD");
  uploadFile(req,res,err=>{
    if(err){
      console.log('Error');
      err.message='error al subir la imagen'
      return res.send(err)
    }
    res.send({msg:'FILE UPLOADED'})
  })
})
/********************************************/


/***** FORMULARIO - METODO POST ******/
app.post("/forms-querys", (req, res, err) => {
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  console.log("app.post-> /FORMS-QUERYS");
  console.log("req.body:", req.body);
  console.log("req.method: ", req.method);
  console.log("req.params: ", req.params);
  console.log("req.query:", req.query);
  res.status(201).send({msj:'ok'})
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
})
/*************************************/

/***** FORMULARIO - METODO GET ******/
app.get("/forms-querys", (req, res, err) => {
    console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
    console.log("app.post-> /FORMS-QUERYS");
    console.log("req.body:", req.body);
    console.log("req.method: ", req.method);
    console.log("req.params: ", req.params);
    console.log("req.query:", req.query);
    res.status(200).send({msj:'ok'})
    console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
})
/*************************************/
  
app.get("/get-form", (req, res, err) => {
    console.log("\x1b[35m%s\x1b[0m", '--------------------- /get-form -------------------------')
    const url = new URL( import.meta.dirname);
    const {href: root} = new URL( import.meta.dirname)
    res.status(200).sendFile( root+'\\htmls\\home.html');
});


export const start = () => {
  app.listen(port, () => console.log("Example app listening on port 3000!"));
}