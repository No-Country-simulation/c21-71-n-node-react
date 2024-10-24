import bcryptjs from 'bcryptjs';

export const   passwordEncryptor=async(password:string)=>{
    const salt = await bcryptjs.genSalt(10);
  const encryptedPassword =  bcryptjs.hash(password, salt);
  return encryptedPassword

}