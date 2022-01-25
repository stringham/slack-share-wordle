import { getLastGuess } from '../../lib/statuses'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'

type Props = {
  guesses: string[]
  isComplete: boolean
  colorBlind: boolean
}

export const Grid = ({ guesses, isComplete, colorBlind }: Props) => {
  const allGuesses = guesses.slice()
  while (allGuesses.length < 7) {
    allGuesses.push('')
  }

  const lastGuess = getLastGuess(guesses)

  const rows = isComplete
    ? guesses
        .slice(0, 6)
        .map((guess, i) =>
          guess.length === 5 ? (
            <CompletedRow
              key={i}
              colorBlind={colorBlind}
              guess={guess}
              finalGuess={lastGuess}
            />
          ) : (
            <CurrentRow key={i} guess={guess} />
          )
        )
    : allGuesses.map((guess, i) => <CurrentRow key={i} guess={guess} />)
  return <div className="pb-6">{rows}</div>
}
