import {stringToSlug} from '@/lib/utils/common/string-to-slug'
import {FormCheckbox, FormInput} from '@/lib/zod/sections/content/form'
import classNames from 'classnames'
import RichText, {type RichTextPropValue} from './RichText'

type FormFieldProps = {
  field: FormInput
  error?: string
  className?: string
}

export default function RenderFormField({field, error, className: cssClass}: FormFieldProps) {
  const {id, title, info, type, required, options, cbxOptions, optLayout, size} = field
  const placeholder = 'placeholder' in field ? field.placeholder : undefined
  const inputId = stringToSlug(id + '-' + title)

  const fieldCss = classNames(
    'lyraFormField',
    size,
    type,
    {
      fieldset: type === 'radio' || type === 'checkbox',
    },
    cssClass,
  )

  if (type === 'text' || type === 'email' || type === 'tel') {
    return (
      <div className={fieldCss}>
        <label htmlFor={inputId}>
          {title}
          {required && <span className={error ? 'hasError' : undefined}>*</span>}
        </label>
        {info && <span className="lyraFormField-info">{info}</span>}
        <input
          id={inputId}
          type={type}
          name={id}
          placeholder={placeholder || ''}
          className={error ? 'hasError' : undefined}
        />
        {error && <span className="lyraFormField-error">{error}</span>}
      </div>
    )
  }

  if (type === 'textarea') {
    return (
      <div className={fieldCss}>
        <label htmlFor={inputId}>
          {title}
          {required && <span className={error ? 'hasError' : undefined}>*</span>}
        </label>
        {info && <span className="lyraFormField-info">{info}</span>}
        <textarea
          rows={5}
          id={inputId}
          name={id}
          placeholder={placeholder || ''}
          className={error ? 'hasError' : undefined}
        />
        {error && <span className="lyraFormField-error">{error}</span>}
      </div>
    )
  }

  if (type === 'select') {
    return (
      <div className={fieldCss}>
        <label htmlFor={inputId}>
          {title}
          {required && <span className={error ? 'hasError' : undefined}>*</span>}
        </label>
        {info && <span className="lyraFormField-info">{info}</span>}
        <select id={inputId} name={id} className={error ? 'hasError' : undefined} defaultValue="">
          <option value="" disabled={required}>
            Select option
          </option>
          {options.map((opt, i) => (
            <option key={i} value={stringToSlug(opt)}>
              {opt}
            </option>
          ))}
        </select>
        {error && <span className="lyraFormField-error">{error}</span>}
      </div>
    )
  }

  if (type === 'radio') {
    return (
      <fieldset className={fieldCss}>
        <legend>
          {title}
          {required && <span className={error ? 'hasError' : undefined}>*</span>}
        </legend>
        {info && <span className="lyraFormField-info">{info}</span>}
        <div className={`lyraFormField-options ${optLayout}`}>
          {options.map((opt, i) => {
            const optId = inputId + '-' + i
            return (
              <div key={optId} className="lyraFormField-option radio">
                <input
                  type="radio"
                  id={optId}
                  name={id}
                  value={stringToSlug(opt)}
                  defaultChecked={i === 0}
                  className={error ? 'hasError' : undefined}
                />
                <label htmlFor={optId}>{opt}</label>
              </div>
            )
          })}
        </div>
        {error && <span className="lyraFormField-error">{error}</span>}
      </fieldset>
    )
  }

  if (type === 'checkbox') {
    const hasCbx = cbxOptions && cbxOptions.length > 0
    return (
      <fieldset className={fieldCss}>
        <legend>{title}</legend>
        {info && <span className="lyraFormField-info">{info}</span>}
        {hasCbx && (
          <div className={`lyraFormField-options ${optLayout}`}>
            {cbxOptions.map((opt: FormCheckbox, i: number) => {
              const optId = inputId + '-' + i
              const label = opt.label as RichTextPropValue
              const value = stringToSlug(`${i}-${title}-${opt.value ?? 'opt'}`)
              return (
                <div key={optId} className="lyraFormField-option checkbox">
                  <input
                    type="checkbox"
                    id={optId}
                    name={id}
                    value={value}
                    defaultChecked={opt.checked}
                    className={error ? 'hasError' : undefined}
                  />
                  <label htmlFor={optId}>
                    {error && opt.required && <span className="hasError">*</span>}
                    <RichText value={label} />
                  </label>
                </div>
              )
            })}
          </div>
        )}
        {error && <span className="lyraFormField-error">{error}</span>}
      </fieldset>
    )
  }

  return null
}
