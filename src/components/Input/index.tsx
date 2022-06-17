import React from 'react'
import style from './style.module.scss'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string
}

export default function Input({ label, ...rest }: InputProps) {
  return (
    <div className={style.wrapper}>
      {label && (
        <label htmlFor="" className={style.label}>
          {label}
        </label>
      )}
      <input type="text" {...rest} className={style.input} />
    </div>
  )
}
