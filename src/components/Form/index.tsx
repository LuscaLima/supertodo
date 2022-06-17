import { ReactNode } from 'react'
import style from './style.module.scss'

interface FormProps {
  children: ReactNode
}

export default function Form({ children }: FormProps) {
  return <form className={style.form}>{children}</form>
}
