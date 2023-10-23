import logo from '../../assets/images/octo-cat.png'

export function Footer() {
  return (
    <footer>
      <div className='github'>
        <img className="git-hub-logo" src={logo}/>
        <a href="https://github.com/Pparg" className='link'>Pierre-Paul WEISS</a>
      </div>
      <div className='github'>
        <img className="git-hub-logo" src={logo}/>
        <a href="https://github.com/SarahZwahlen" className='link'>Sarah ZWAHLEN</a>
      </div>
    </footer>
  )
}