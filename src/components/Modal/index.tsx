import React, { ReactNode, useRef } from 'react'
import Button from '../Button'
import { X } from 'phosphor-react'

import style from './style.module.scss'

interface ModalProps {
  title: string
  show: boolean
  okText: string
  okHandler?: () => void
  closeHandler?: () => void
  children: ReactNode
}

export default function Modal({
  title,
  show,
  children,
  okText = 'Ok',
  okHandler,
  closeHandler
}: ModalProps) {
  const backdrop = useRef(null)

  function handleCloseOutside(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === backdrop.current && closeHandler) {
      closeHandler()
    }
  }

  return (
    <>
      {show && (
        <div
          ref={backdrop}
          className={style.backdrop}
          onClick={e => handleCloseOutside(e)}
        >
          <div className={style.modal}>
            <header className={style.header}>
              <h2 className={style.title}>{title}</h2>
              <button className={style.close} onClick={closeHandler}>
                <X />
              </button>
            </header>
            <div className={style.content}>{children}</div>
            <footer className={style.footer}>
              <Button selfType="secondary" onClick={closeHandler}>
                Cancel
              </Button>
              {okHandler && <Button onClick={okHandler}>{okText}</Button>}
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
