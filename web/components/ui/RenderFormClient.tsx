'use client'

import {FormEvent, useCallback, useRef, useState} from 'react'
import {FormInput} from '@/lib/zod/sections/content/form'
import RichText, {type RichTextPropValue} from '@/components/ui/RichText'
import RenderFormField from './RenderFormField'
import {type FormErrors, validateFormValues} from '@/lib/utils/forms/validate-form'
import {stringToSlug} from '@/lib/utils/common/string-to-slug'
import {formTrackStart, formTrackError, formTrackSubmission} from '@/lib/utils/forms/tracking-form'
import {recaptchaSiteKey} from '@/lib/const/env'
import {getRecaptchaToken} from '@/lib/utils/forms/recaptcha-client'
import {toRecaptchaAction} from '@/lib/utils/forms/recaptcha-action'

import {readConsent} from '@/lib/consent/client'

type RanderFormClientProps = {
  title: string
  inputs: FormInput[]
  formTitle?: string
  btnTxt?: string
  disclaimer?: RichTextPropValue
}

export default function RanderFormClient({
  title,
  inputs,
  formTitle,
  btnTxt,
  disclaimer,
}: RanderFormClientProps) {
  const [errors, setErrors] = useState<FormErrors>({})
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const formKind = stringToSlug(title)
  const recaptchaAction = toRecaptchaAction(formKind)

  const startedRef = useRef(false)
  const hasInputs = inputs && inputs.length > 0
  const hasFooter = Array.isArray(disclaimer) && disclaimer.length > 0

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (submitting) return

      setSubmitting(true)

      try {
        const form = e.currentTarget
        const formData = new FormData(form)

        const {valid, errors: nextErrors, normalized} = validateFormValues(inputs, formData)

        if (!startedRef.current) {
          formTrackStart(formKind)
          startedRef.current = true
        }

        if (!valid) {
          setErrors({
            ...nextErrors,
            _form: 'Form contains errors. Please fix and try again.',
          })
          setOpenSnackbar(true)
          formTrackError(formKind, 'validation')
          return
        }

        if (!recaptchaSiteKey) {
          setErrors({
            _form: 'Could not verify you’re human. Please try again later.',
          })
          setOpenSnackbar(true)
          formTrackError(formKind, 'recaptcha_client_missing_key')
          return
        }

        const token = await getRecaptchaToken(recaptchaSiteKey, recaptchaAction)

        if (!token) {
          setErrors({
            _form: 'Could not verify you’re human. Please try again.',
          })
          setOpenSnackbar(true)
          formTrackError(formKind, 'recaptcha_client_missing')
          return
        }

        const consent = readConsent()
        const marketingConsent = !!consent?.state?.marketing

        const res = await fetch('/api/forms/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            kind: formKind,
            values: normalized,
            recaptchaToken: token,
            recaptchaAction,
            marketingConsent,
            consentMeta: {
              version: consent?.version ?? null,
              timestamp: consent?.timestamp ?? null,
            },
          }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          setErrors({
            _form: data?.error || 'We could not submit your message. Please try again later.',
          })
          setOpenSnackbar(true)
          formTrackError(formKind, 'submit_failed')
          return
        }

        formTrackSubmission(formKind)
        setOpenSnackbar(false)
        setErrors({})
        form.reset()
      } catch (err) {
        console.error('Form submit unexpected error:', err)
        setErrors({
          _form: 'Unexpected error. Please try again.',
        })
        setOpenSnackbar(true)
        formTrackError(formKind, 'unexpected_client_error')
      } finally {
        setSubmitting(false)
      }
    },
    [inputs, formKind, recaptchaAction, submitting],
  )

  const handleFocus = useCallback(() => {
    if (!startedRef.current) {
      formTrackStart(formKind)
      startedRef.current = true
    }
  }, [formKind])

  return (
    <form className="arrFormSection-form" onSubmit={handleSubmit} onFocus={handleFocus}>
      {formTitle && <div className="arrFormSection-form-title">{formTitle}</div>}

      {hasInputs ? (
        <>
          <div className="arrFormSection-inputs">
            {inputs.map((input) => (
              <RenderFormField key={input.id} field={input} error={errors[input.id]} />
            ))}
          </div>
          <button type="submit" className="arrButton highlighted" disabled={submitting}>
            {submitting ? 'Sending...' : btnTxt}
          </button>

          {openSnackbar && errors._form && (
            <div className="arrFormSection-error">{errors._form}</div>
          )}

          {hasFooter && <RichText className="arrFormSection-footer" value={disclaimer} />}
        </>
      ) : (
        <div className="arrFormSection-inputs">Form has no inputs yet.</div>
      )}
    </form>
  )
}
