import './App.scss';
import {useEffect, useState} from 'react';
import COLORS_ARRAY from './colorArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

let quotesDbUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const [quote, setQuote] = useState('QUOTE QUOTE QUOTE')
  const [author, setAuthor] = useState('AUTHOR')
  const [randomNumber, setRandomNumber] = useState(0)
  const [quoteArray, setQuoteArray] = useState(null)
  const [bgColor, setBgColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuoteArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quotesDbUrl)
  },[quotesDbUrl])

  const generateRandomQuote = () => {
    let randomInteger = Math.floor(Math.random() * quoteArray.length)
    setRandomNumber(randomInteger)
    setBgColor(COLORS_ARRAY[randomInteger])
    setQuote(quoteArray[randomInteger].quote)
    setAuthor(quoteArray[randomInteger].author)
  }
  
  return (
    <div className="App">
      <header className="App-header" style={{
        backgroundColor: bgColor
      }}>
        <div id='quote-box' style={{color: bgColor}}>
        <p id='text'>
        <span id='quote-icon'><FontAwesomeIcon icon= {faQuoteLeft} /></span>
          {quote}
        </p>
        <p id='author'>
          - {author}
        </p>
        <div className='buttons'>
        <a id='tweet-quote' style={{
        backgroundColor: bgColor
      }} href={encodeURI(`https://twitter.com/intent/tweet?text=${quote}\n-${author}`)}>
        <FontAwesomeIcon icon= {faHashtag} />
      </a>
        <button id='new-quote' style={{
        backgroundColor: bgColor
      }} onClick={() => generateRandomQuote()}>Change Quote</button>
      </div>
        </div>     
      </header>
    </div>
  );
}

export default App;
