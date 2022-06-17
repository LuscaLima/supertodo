import React from 'react'
import style from './style.module.scss'

interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  label?: string
}

export default function Textarea({ label, ...rest }: TextareaProps) {
  return (
    <div className={style.wrapper}>
      {label && (
        <label htmlFor="" className={style.label}>
          {label}
        </label>
      )}
      <textarea {...rest} className={style.text}></textarea>
    </div>
  )
}
