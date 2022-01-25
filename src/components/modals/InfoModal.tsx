import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal
      title="Share your Wordle games to slack"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500">
        Fill in your{' '}
        <a
          className="underline font-bold"
          rel="noreferrer"
          target="_blank"
          href="https://www.powerlanguage.co.uk/wordle/"
        >
          Wordle
        </a>{' '}
        grid to get a version you can copy to share in slack with the revealed
        letters using{' '}
        <a
          className="underline font-bold"
          rel="noreferrer"
          target="_blank"
          href="slack-wordle.zip"
        >
          these wordle slack emoji
        </a>
        .
      </p>

      <div className="place-content-center flex mt-4">
        <img alt="slack share preview" src="slackshare.png" />
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Easily upload all the slack emoji to your slack instance using this{' '}
        <a
          className="underline font-bold"
          rel="noreferrer"
          target="_blank"
          href="https://chrome.google.com/webstore/detail/neutral-face-emoji-tools/anchoacphlfbdomdlomnbbfhcmcdmjej"
        >
          bulk emoji upload extension
        </a>
        .
      </p>

      <p className="text-sm text-gray-500 mt-4">
        Fill in the grid including the final correct word (if you failed, the
        7th guess is where you put the solution) and press Enter.
      </p>

      <p className="text-sm text-gray-500 mt-4">
        Click the button to copy the share message to your clipboard.
      </p>
    </BaseModal>
  )
}
