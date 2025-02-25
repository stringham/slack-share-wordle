import { CogIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { getGuessStatuses, getLastGuess } from './lib/statuses'

function App() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [showKeepTyping, setShowKeepTyping] = useState(false)
  const [showedKeepTyping, setShowedKeepTyping] = useState(false)
  const [shareTextCopied, setShareTextCopied] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(new Array(7).fill(''))
  const [isComplete, setIsComplete] = useState(false)
  const [colorBlind, setIsColorBlind] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('colorBlind') ?? 'false') as boolean
  })

  const setColorBlind = (value: boolean) => {
    setIsColorBlind(value)
    localStorage.setItem('colorBlind', `${value}`)
  }

  const onChar = (value: string) => {
    const newGuesses = guesses.slice()
    for (let i = 0; i < newGuesses.length; i++) {
      if (newGuesses[i].length < 5) {
        newGuesses[i] += value
        break
      }
    }
    setShowedKeepTyping(false)
    setGuesses(newGuesses)
    setIsComplete(false)
  }

  const onDelete = () => {
    const newGuesses = guesses.slice()
    for (let i = newGuesses.length - 1; i >= 0; i--) {
      if (newGuesses[i].length > 0) {
        newGuesses[i] = newGuesses[i].substr(0, newGuesses[i].length - 1)
        break
      }
    }
    setShowedKeepTyping(false)
    setGuesses(newGuesses)
    setIsComplete(false)
  }

  const onEnter = () => {
    if (guesses[0].length === 0) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, 2000)
    }
    for (const guess of guesses) {
      if (guess.length > 0 && guess.length < 5) {
        setIsNotEnoughLetters(true)
        return setTimeout(() => {
          setIsNotEnoughLetters(false)
        }, 2000)
      }
    }

    if (guesses[1].length === 0 && !showedKeepTyping) {
      setShowKeepTyping(true)
      setShowedKeepTyping(true)
      return setTimeout(() => {
        setShowKeepTyping(false)
      }, 2000)
    }

    setIsComplete(true)
  }

  const copyShareText = () => {
    const epochMs = new Date('06/19/2021').getTime()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const finalGuess = getLastGuess(guesses)
    const emojiGrid = guesses
      .filter((guess, i) => guess.length > 0 && i < 6)
      .map((guess) => {
        const statuses = getGuessStatuses(guess, finalGuess)
        return statuses
          .map((status, i) => {
            switch (status) {
              case 'absent':
                return `:wordle-${guess[i].toLowerCase()}-gray:`
              case 'correct':
                return `:wordle-${guess[i].toLowerCase()}-${
                  colorBlind ? 'orange' : 'green'
                }:`
              case 'present':
                return `:wordle-${guess[i].toLowerCase()}-${
                  colorBlind ? 'blue' : 'yellow'
                }:`
            }
            return ''
          })
          .join('')
      })
      .join('\n')

    const guessCount = guesses.filter((g) => g.length > 0).length
    const guessCountText = guessCount <= 6 ? `${guessCount}/6` : 'X/6'

    const text = `Wordle ${index} ${guessCountText}\n\n${emojiGrid}`

    navigator.clipboard.writeText(text)

    setShareTextCopied(true)
    return setTimeout(() => {
      setShareTextCopied(false)
    }, 2000)
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Slack Share Wordle</h1>
        <CogIcon
          className="h-6 w-6 cursor-pointer mr-4"
          onClick={() => setIsSettingsModalOpen(true)}
        />
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
      <Grid guesses={guesses} isComplete={isComplete} colorBlind={colorBlind} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={isComplete ? guesses : []}
        colorBlind={colorBlind}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <SettingsModal
        setColorBlind={setColorBlind}
        colorBlind={colorBlind}
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
      />
      {isComplete && (
        <button
          type="button"
          className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
          onClick={() => copyShareText()}
        >
          Copy share text
        </button>
      )}

      <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
      <Alert message="Keep Typing!" isOpen={showKeepTyping} />
      <Alert message="Copied!" variant="success" isOpen={shareTextCopied} />
    </div>
  )
}

export default App
