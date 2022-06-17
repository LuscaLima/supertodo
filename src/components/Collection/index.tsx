import { CheckCircle } from 'phosphor-react'
import style from './style.module.scss'

export interface CollectionData {
  id: number
  title: string
  todosAmount: number
  todosDone: number
}

interface CollectionProps extends CollectionData {
  onSelected: (id: CollectionData) => void
}

export default function Collection({
  id,
  title,
  todosAmount,
  todosDone,
  onSelected
}: CollectionProps) {
  return (
    <div
      className={style.card}
      onClick={() => onSelected({ id, title, todosAmount, todosDone })}
    >
      <header className={style.header}>
        <div className={style.icon}>
          <CheckCircle />
        </div>
      </header>
      <div className={style.content}>
        <h2 className={style.title}>{title}</h2>
      </div>
      <footer className={style.footer}>
        <div className={style.tracking}>
          <span className={style.done}>{todosDone}</span>/
          <span className={style.total}>{todosAmount}</span> done
        </div>
        <span className={style.progress}></span>
      </footer>
    </div>
  )
}
