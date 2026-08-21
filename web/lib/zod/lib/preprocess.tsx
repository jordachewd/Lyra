import {z} from 'zod'

export const asBool = () => z.preprocess((v) => (v == null ? false : v), z.boolean())
export const asOptionalUrl = z.preprocess((v) => (v === '' ? undefined : v), z.url().optional())
export const asOptionalEmail = z.preprocess((v) => (v === '' ? undefined : v), z.email().optional())
