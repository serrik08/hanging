import { useEffect, useState } from 'react'
import { HangImage } from './components/HangImage'
import { letters } from './helpers/letters'
import { getRandomWord } from './helpers/getRandomWord'
import './App.css'

function App() {
  const [ attemps, setAttempts ] = useState(0)
  const [ word, setWord ] = useState(getRandomWord)
  const [ hiddenWord, setHiddenWord ] = useState('_ '.repeat( word.length ))
  const [ lose, setLose ] = useState( false )
  const [ won, setWon ] = useState( false )

  // determinar si la persona perdio
  useEffect( () => {
    if ( attemps >= 9) {
      setLose( true )
    }
  }, [ attemps ] )

  // determinar si la persona gano
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('')
    if ( currentHiddenWord === word) {
      setWon( true )
    }

  }, [hiddenWord])


  const checkLetter = ( letter: string ) => {
    if (lose) return
    if (won) return

    if ( !word.includes(letter) ) {
      setAttempts( Math.min( attemps + 1, 9 ) )
      return
    }

    const hiddenWordArray = hiddenWord.split(' ')

    for( let i = 0; i < word.length; i++ ) {
      if ( word[i] === letter ) {
        hiddenWordArray[i] = letter
      }
    }
    setHiddenWord(hiddenWordArray.join(' '))
  }

  const newGame = () => {
    const newWord = getRandomWord()

    setWord( newWord )
    setHiddenWord( '_ '.repeat( newWord.length ) )
    setAttempts(0)
    setLose(false)
    setWon(false)
  }

  return (
    <div className='App'>

      {/* Imagenes */}
      <HangImage imageNumber={ attemps }/>

      {/* palabra oculta*/}
      <h3>{ hiddenWord }</h3>

      {/* contador de intendos*/}
      <h3>Intentos: {attemps} </h3>

      {/* mesaje si perdio*/}
      {
        ( lose ) 
        ? <h2>Perdio { word }</h2>
        : ''
      }

      {/* mesaje si gana*/}
      {
        ( won ) 
        ? <h2>Felicidades, usted gano</h2>
        : ''
      }

      {/* botones de letras*/}
      {
        letters.map( (letter) => (
          <button 
            onClick={ () => checkLetter(letter) }
            key= { letter } >
              { letter }
          </button>
        ))
      }

      <br />
      <button
        onClick={ newGame }
        >
          Nuevo juego
      </button>

    </div>
  )
}

export default App
