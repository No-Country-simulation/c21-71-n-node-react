import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}

export default validate