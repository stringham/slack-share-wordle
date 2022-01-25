import { getLastGuess } from '../../lib/statuses';
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'

type Props = {
  guesses: string[]
  isComplete: boolean
}

export const Grid = ({ guesses, isComplete}: Props) => {
  const allGuesses = guesses.slice();
  while(allGuesses.length < 7) {
      allGuesses.push('')
  }

  const rows = isComplete ? guesses.filter(guess => guess.length === 5).map((guess, i, arr) => (
      <CompletedRow key={i} guess={guess} finalGuess={getLastGuess(arr)} />
  )) : allGuesses.map((guess, i) => (<CurrentRow key={i} guess={guess} />))
  return (
    <div className="pb-6">
      {rows}
    </div>
  )
}
