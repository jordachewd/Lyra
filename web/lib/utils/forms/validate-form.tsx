import {FormInput} from '@/lib/zod/sections/content/form'
import {isPlainSafeText, isSafeEmail, normalizeTel, isSafeTel} from './validate-utils'
import {stringToSlug} from '../common/string-to-slug'

export type FormErrors = Record<string, string>

type ValidateResult = {
  valid: boolean
  errors: FormErrors
  normalized: Record<string, string | string[] | null>
}

export function validateFormValues(inputs: FormInput[], formData: FormData): ValidateResult {
  const errors: FormErrors = {}
  const normalized: Record<string, string | string[] | null> = {}

  for (const field of inputs) {
    const {id, title, type, required, cbxOptions = []} = field
    const label = title || id
    const rawAll = formData.getAll(id)
    const raw = (rawAll[0] ?? '').toString().trim()

    switch (type) {
      case 'text':
      case 'textarea': {
        normalized[id] = raw || null

        if (required && !raw) {
          errors[id] = `${label} is required`
          break
        }

        if (raw && !isPlainSafeText(raw, {multiline: type === 'textarea'})) {
          errors[id] = `${label} contains disallowed content`
        }

        break
      }

      case 'email': {
        normalized[id] = raw || null

        if (required && !raw) {
          errors[id] = `${label} is required`
          break
        }

        if (raw && !isSafeEmail(raw)) {
          errors[id] = `Enter a valid email address`
        }

        break
      }

      case 'tel': {
        normalized[id] = raw ? normalizeTel(raw) : null

        if (required && !raw) {
          errors[id] = `${label} is required`
          break
        }

        if (raw && !isSafeTel(raw)) {
          errors[id] = `Enter a valid phone number`
        }

        break
      }

      case 'select': {
        const v = raw
        normalized[id] = v || null

        if (required && !v) {
          errors[id] = `Please select an option`
        }
        break
      }

      case 'radio': {
        const v = raw
        normalized[id] = v || null

        if (required && !v) {
          errors[id] = `Please choose an option`
        }
        break
      }

      case 'checkbox': {
        // what the browser sent
        const selectedVals = rawAll.map((v) => v.toString()).filter(Boolean)
        normalized[id] = selectedVals.length ? selectedVals : null

        // recreate the **exact** values we used in RenderFormField
        const requiredCheckboxes = cbxOptions
          .map((opt, idx) => {
            const runtimeValue = stringToSlug(`${idx}-${title}-${opt.value ?? 'opt'}`)
            return {
              required: !!opt.required,
              value: runtimeValue,
            }
          })
          .filter((o) => o.required)

        const missingRequired = requiredCheckboxes.filter((o) => !selectedVals.includes(o.value))

        if (missingRequired.length > 0) {
          errors[id] = `Please accept the required option(s)`
        } else if (required && selectedVals.length === 0) {
          // field itself is required but none checked
          errors[id] = `Please check at least one option`
        }

        break
      }

      /*       case "checkbox": {
        const selectedVals = rawAll.map((v) => v.toString()).filter(Boolean);
        normalized[id] = selectedVals.length ? selectedVals : null;

        const requiredCbx = cbxOptions.filter((o) => o.required);

        const missingRequired = requiredCbx.filter(
          (o) => !selectedVals.includes(o.value)
        );

        if (missingRequired.length > 0) {
          errors[id] = `Please accept the required option(s)`;
        } else if (required && selectedVals.length === 0) {
          errors[id] = `Please check at least one option`;
        }

        break;
      } */

      default: {
        normalized[id] = raw || null
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalized,
  }
}
