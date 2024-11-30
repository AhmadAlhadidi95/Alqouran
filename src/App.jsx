import './App.css';
import { MainBox } from './components/MainBox';

function App() {

  return (
    <div className='container'>
      <MainBox/>

      <div className='myInfo'>
        <a href="https://github.com/AhmadAlhadidi95" target="_blank" rel="noopener noreferrer" title="Visit my Github">
            <i className="fa-brands fa-github"/>
        </a>

        <a href="https://alhadidi95.netlify.app/#contact-me" target="_blank" rel="noopener noreferrer" title="Visit my website">
            <img src="/public/My-sign.png" alt="My-sign"/>
        </a>

        <a href="https://twitter.com/AhmadAlhadidi95" target="_blank" rel="noopener noreferrer" title="Visit my X">
            <i className="fa-brands fa-x-twitter"/>
        </a>
      </div>
    </div>
  )
}

export default App
