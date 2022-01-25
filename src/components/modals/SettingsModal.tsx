import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  colorBlind: boolean
  setColorBlind: (value: boolean) => void
}

export const SettingsModal = ({
  isOpen,
  colorBlind,
  handleClose,
  setColorBlind,
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex justify-between">
        Color blind mode:
        <div>
          <input
            type="checkbox"
            name=""
            id="color-blind"
            checked={colorBlind}
            className="hidden"
            onChange={(event) => {
              setColorBlind(event.target.checked)
            }}
          />
          <label htmlFor="color-blind" className="cursor-pointer">
            <div className="w-9 h-5 flex items-center bg-gray-300 rounded-full p2">
              <div className="w-4 h-4 bg-white rounded-full shadow switch-ball"></div>
            </div>
          </label>
        </div>
      </div>
    </BaseModal>
  )
}
