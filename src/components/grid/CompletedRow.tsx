import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  finalGuess: string
  colorBlind: boolean
}

export const CompletedRow = ({ guess, finalGuess, colorBlind }: Props) => {
  const statuses = getGuessStatuses(guess, finalGuess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          colorBlind={colorBlind}
        />
      ))}
    </div>
  )
}
