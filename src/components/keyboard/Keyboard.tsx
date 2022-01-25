import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  colorBlind: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  colorBlind,
}: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key
          value="Q"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['Q']}
        />
        <Key
          value="W"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['W']}
        />
        <Key
          value="E"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['E']}
        />
        <Key
          value="R"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['R']}
        />
        <Key
          value="T"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['T']}
        />
        <Key
          value="Y"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['Y']}
        />
        <Key
          value="U"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['U']}
        />
        <Key
          value="I"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['I']}
        />
        <Key
          value="O"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['O']}
        />
        <Key
          value="P"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['P']}
        />
      </div>
      <div className="flex justify-center mb-1">
        <Key
          value="A"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['A']}
        />
        <Key
          value="S"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['S']}
        />
        <Key
          value="D"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['D']}
        />
        <Key
          value="F"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['F']}
        />
        <Key
          value="G"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['G']}
        />
        <Key
          value="H"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['H']}
        />
        <Key
          value="J"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['J']}
        />
        <Key
          value="K"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['K']}
        />
        <Key
          value="L"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['L']}
        />
      </div>
      <div className="flex justify-center">
        <Key
          width={65.4}
          value="ENTER"
          colorBlind={colorBlind}
          onClick={onClick}
        >
          Enter
        </Key>
        <Key
          value="Z"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['Z']}
        />
        <Key
          value="X"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['X']}
        />
        <Key
          value="C"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['C']}
        />
        <Key
          value="V"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['V']}
        />
        <Key
          value="B"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['B']}
        />
        <Key
          value="N"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['N']}
        />
        <Key
          value="M"
          onClick={onClick}
          colorBlind={colorBlind}
          status={charStatuses['M']}
        />
        <Key
          width={65.4}
          value="DELETE"
          colorBlind={colorBlind}
          onClick={onClick}
        >
          Delete
        </Key>
      </div>
    </div>
  )
}
