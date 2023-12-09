import ProfileImage from '@/components/ProfileImage'

interface Props {
  username: string
  message?: string
  time: string
}

export default function PartnerChat({ username, message, time }: Props) {
  return (
    <div className="flex gap-2 px-2 py-1">
      <ProfileImage className="h-12" src="https://picsum.photos/id/64/64/64" />
      <div className="flex flex-col gap-1">
        <div>{username}</div>
        {message && (
          <p className="max-w-[18rem] rounded bg-white px-[12px] py-[6px]">
            {message}
          </p>
        )}
      </div>
      <div className="mt-auto text-xs">{time}</div>
    </div>
  )
}
