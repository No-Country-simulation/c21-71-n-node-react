import { z } from 'zod'

const animalSchema = z.object({
    name: z.string(),
    type: z.string()
})

export default animalSchema