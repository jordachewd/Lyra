import {ptToPlainText} from './pt-to-plain-text'

export function ptMaxCharsValidator(max: number) {
  return (value: unknown) => {
    const len = ptToPlainText(value).length
    return len <= max ? true : `Content is ${len} characters. Limit is ${max}.`
  }
}
