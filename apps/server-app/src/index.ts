import express from 'express';
import  router  from './routes/user.route';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)
app.listen(3001, () => {
  console.log('http://localhost:3001');
});



