import style from './style.module.scss'

export default function Footer() {
  return (
    <footer className={style.footer}>
      Made with 💙 by &nbsp;{' '}
      <a href="https://github.com/LuscaLima" target="_blank">
        Luca Lima
      </a>
    </footer>
  )
}
