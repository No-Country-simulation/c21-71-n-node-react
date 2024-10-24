import express,{Request,Response} from 'express';
import cors from 'cors';
import  router  from './routes/user-route';

const PORT=process.env.PORT || 3000


const app = express();


const corsOptions={
  origin:'*'
}


app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)
// 404
app.use((_req:Request, res:Response) => {
  res.status(404).json({ok:false,error:'404 Not Found'});
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});



