import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

/**
 * 
 * @param newUser 
 * @param expiresIn "60","10h", "2 days",  "7d"  !Note ("60" is equal to "60ms")
 * @returns 
 */
export const generateToken = ({email,roleId}:{email:string,roleId:number},expiresIn:string)=>{
    const token=jwt.sign(
        {
          email,
          roleId
        },
    
        jwtSecret,
    
        {
          expiresIn,
        }
      );
    return token

}