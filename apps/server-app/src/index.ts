import express,{Request,Response} from 'express';
import  router  from './routes/user-route';



const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)
// 404
app.use((_req:Request, res:Response) => {
  res.status(404).send('Página no encontrada');
});
app.listen(3001, () => {
  console.log('http://localhost:3001');
});



