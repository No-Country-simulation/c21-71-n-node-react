import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImgsToCloudinary = async (imgs: string[]) => {
  if (imgs.length > 0) {
    const imagesToUpload = imgs.map(async (image) => {
      const result = await cloudinary.v2.uploader.upload(image);
      return result.url;
    });

    let uploads = await Promise.all(imagesToUpload);
    return uploads
  }{
    let uploads:string[]=[]
    return uploads
  }
};
