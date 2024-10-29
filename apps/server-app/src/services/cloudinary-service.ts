import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
/**
 * 
 * @param imgs string{}[] Con las rutas de las imagenes que se alojan en nuestro files system
 * @returns string[] Con los links donde se elojaron nuestras imagenes en la nube de cloudinary
 */
export const uploadImgsToCloudinary = async (imgs: string[]) => {
  if (imgs.length > 0) {
    const imagesToUpload = imgs.map(async (image) => {
      const result = await cloudinary.v2.uploader.upload(image);
      return {url:result.url,public_id:result.public_id};
    });

    const uploads = await Promise.all(imagesToUpload);
    return uploads
  }{
    let uploads:{}[]=[{}]
    return uploads
  }
};


export const updateImgCloudinaryService=async(imgs:string[],data:{url:string,public_id:string}[])=>{
//TODO continuar aqui
if(imgs.length>0){
  const imagesUpdateToUpload = imgs.map(async (image,index) => {
    const result = await cloudinary.v2.uploader.upload(image,{public_id:data[index].public_id});
    
    return {url:result.url,public_id:result.public_id};
  })
  const updatedImages= await Promise.all(imagesUpdateToUpload)


  updatedImages.map((image,index)=>{
    
    
     return data[index]=image
  })
  
  
  
  return data
}else{
  return [{url:'',public_id:''}]
}
}