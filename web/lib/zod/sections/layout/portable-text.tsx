import {z} from 'zod'

export const PortableTextSchema = z.preprocess(
  (v) => (Array.isArray(v) ? v : []),
  z.array(z.unknown()),
)
