import style from './style.module.scss'

import logo from '@/assets/img/rocket.svg'

export default function Header() {
  return (
    <header className={style.header}>
      <h1 className={style.title}>super.todo</h1>
    </header>
  )
}
