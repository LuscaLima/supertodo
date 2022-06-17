import { ReactNode } from 'react'
import style from './style.module.scss'

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  link?: boolean
  rounded?: boolean
  selfType?: 'primary' | 'secondary'
  children: ReactNode
}

function applicableClasses(rawClasses: Record<string, boolean>) {
  const classes = { ...rawClasses }

  for (const key in classes) {
    if (!classes[key]) Reflect.deleteProperty(classes, key)
  }

  return Object.keys(classes).join(' ')
}

export default function Button({
  children,
  selfType = 'primary',
  link = false,
  rounded = false,
  ...rest
}: ButtonProps) {
  const classes = {
    [style.button]: true,
    [style.link]: link,
    [style.rounded]: rounded,
    [style[selfType]]: selfType !== 'primary'
  }

  return (
    <button {...rest} className={applicableClasses(classes)}>
      {children}
    </button>
  )
}
