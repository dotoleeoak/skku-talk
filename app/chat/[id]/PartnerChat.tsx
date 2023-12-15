import Image from 'next/image'
import ProfileImage from '@/components/ProfileImage'

interface Message {
  name: string
  username: string
  message: string
  fileUrl: string | null
  fileType: string | null
  time: string
}

interface Props {
  message: Message
  showImage: (image: string) => void
}

export default function PartnerChat({ message, showImage }: Props) {
  return (
    <div className="flex gap-2 p-2">
      <ProfileImage height={48} width={48} />
      <div className="flex flex-col gap-1">
        <div>{message.name}</div>
        {message.message && (
          <p className="max-w-[18rem] whitespace-pre-line rounded bg-white px-[12px] py-[6px]">
            {message.message}
          </p>
        )}
        {message.fileUrl && message.fileType === 'image' && (
          <Image
            src={message.fileUrl}
            alt="이미지"
            className="cursor-pointer rounded-lg"
            width={240}
            height={240}
            onClick={() => showImage(message.fileUrl ?? '')}
          />
        )}
        {message.fileUrl && message.fileType === 'video' && (
          <video
            src={message.fileUrl}
            controls
            className="w-[16rem] rounded-lg"
          />
        )}
      </div>
      <div className="mt-auto text-xs">{message.time}</div>
    </div>
  )
}
