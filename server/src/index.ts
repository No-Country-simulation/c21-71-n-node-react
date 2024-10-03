import express from 'express'

const app = express()
app.get('/saludo', (_req, res) => {
  res.json({ mensaje: 'hola' })
})


app.listen(3001,()=>{
    console.log('server corriendo');
    
})