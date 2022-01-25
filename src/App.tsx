import { InformationCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { getStatuses } from './lib/statuses'

function App() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [shareTextCopied, setShareTextCopied] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(new Array(7).fill(''))
  const [isComplete, setIsComplete] = useState(false)



  const onChar = (value: string) => {
      const newGuesses = guesses.slice();
      for(let i=0; i<newGuesses.length; i++) {
          if (newGuesses[i].length < 5) {
              newGuesses[i] += value;
              break;
          }
      }
      setGuesses(newGuesses);
      setIsComplete(false)
  }

  const onDelete = () => {
    const newGuesses = guesses.slice();
    for(let i=newGuesses.length-1; i>=0; i--) {
        if (newGuesses[i].length > 0) {
            newGuesses[i] = newGuesses[i].substr(0,newGuesses[i].length-1);
            break;
        }
    }
    setGuesses(newGuesses);
    setIsComplete(false)
  }

  const onEnter = () => {
      for(const guess of guesses) {
          if(guess.length > 0 && guess.length < 5) {
              setIsNotEnoughLetters(true)
              return setTimeout(() => {
                setIsNotEnoughLetters(false)
              }, 2000)
          }
      }

      setIsComplete(true);
  }

  const copyShareText = () => {

  const epochMs = new Date('06/19/2021').getTime()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
    const statuses = getStatuses(guesses);
    const emojiGrid = guesses.filter((guess, i) => guess.length > 0 && i < 6).map(guess => {
        return guess.split('').map(letter => {
            const status = statuses[letter] ?? 'absent';

            switch(status) {
                case 'absent': return `:wordle-${letter.toLowerCase()}-gray:`;
                case 'correct': return `:wordle-${letter.toLowerCase()}-green:`;
                case 'present': return `:wordle-${letter.toLowerCase()}-yellow:`;
            }
            return '';
        }).join('')
    }).join('\n');

    const guessCount = guesses.filter(g => g.length > 0).length;
    const guessCountText = guessCount <= 6 ? `${guessCount}/6` : 'X/6'

    const text = `Wordle ${index} ${guessCountText}\n\n${emojiGrid}`;

    navigator.clipboard.writeText(text);

    setShareTextCopied(true);
      return setTimeout(() => {
        setShareTextCopied(false)
      }, 2000)
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Slack Share Wordle</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
      <Grid guesses={guesses} isComplete={isComplete}/>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={isComplete? guesses : []}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
    {isComplete && <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => copyShareText()}
      >
        Copy share text
      </button>}

      <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
      <Alert message="Copied!" variant="success" isOpen={shareTextCopied} />
    </div>
  )
}

export default App
