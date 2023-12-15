import Image from 'next/image'

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

export default function MyChat({ message, showImage }: Props) {
  return (
    <div className="flex flex-row-reverse gap-2 px-4 py-2">
      <div className="flex flex-col gap-1">
        {message.message && (
          <p className="max-w-[20rem] whitespace-pre-line rounded bg-main px-[12px] py-[6px]">
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
