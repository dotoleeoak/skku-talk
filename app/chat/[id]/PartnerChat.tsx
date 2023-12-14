import ProfileImage from '@/components/ProfileImage'

interface Props {
  username: string
  message?: string
  time: string
}

export default function PartnerChat({ username, message, time }: Props) {
  return (
    <div className="flex gap-2 p-2">
      <ProfileImage height={48} width={48} />
      <div className="flex flex-col gap-1">
        <div>{username}</div>
        {message && (
          <p className="max-w-[18rem] whitespace-pre-line rounded bg-white px-[12px] py-[6px]">
            {message}
          </p>
        )}
      </div>
      <div className="mt-auto text-xs">{time}</div>
    </div>
  )
}
