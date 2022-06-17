import { Check, TrashSimple } from 'phosphor-react'
import Button from '../Button'

import style from './style.module.scss'

export interface TodoData {
  id: number
  collectionId: number
  title: string
  description?: string
  done: boolean
}

interface TodoProps extends TodoData {
  toggleDone: (id: number) => void
  onDelete: (id: number) => void
}

export default function Todo({
  id,
  title,
  description,
  done,
  toggleDone,
  onDelete
}: TodoProps) {
  return (
    <div className={style.todo}>
      <div className={style.state}>
        <span
          className={`${style.check} ${done ? style.done : ''}`}
          onClick={() => toggleDone(id)}
        >
          {done && <Check weight="bold" />}
        </span>
      </div>
      <div className={`${style.infos} ${done ? style.done : ''}`}>
        <header className={style.header}>
          <strong className={style.title}>{title}</strong>
          <Button link onClick={() => onDelete(id)}>
            <TrashSimple />
          </Button>
        </header>
        {description && (
          <div className={style.content}>
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
