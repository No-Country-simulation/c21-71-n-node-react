>[!NOTE]
> El proyecto esta configurado para usar Mysql

**.env**
```js
DATABASE_URL="mysql://root:password@localhost:3306/mydb"

JWT_SECRET="mi_clave_secreta"

```

Si se modifica el esquema de Prisma  deberea correr el comando `prisma migrate dev` 


Correr el servidor de desarrollo `npm run dev`

Construccion del proyecto `npm run build` creara la carpeta `dist` con el proyecto compilado 
