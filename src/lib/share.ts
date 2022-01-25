import { getGuessStatuses } from './statuses'

export const shareStatus = (guesses: string[]) => {
    const solutionIndex = 1;
  navigator.clipboard.writeText(
    'Wordle ' +
      solutionIndex +
      ' ' +
      guesses.length +
      '/6\n\n' +
      generateEmojiGrid(guesses)
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, guesses[guesses.length-1])
      return guess
        .split('')
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
