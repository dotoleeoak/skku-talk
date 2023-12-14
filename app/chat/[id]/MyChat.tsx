interface Props {
  message: string
  time: string
}

export default function MyChat({ message, time }: Props) {
  return (
    <div className="flex flex-row-reverse gap-2 px-4 py-2">
      <div className="flex flex-col gap-1">
        {message && (
          <p className="max-w-[20rem] whitespace-pre-line rounded bg-main px-[12px] py-[6px]">
            {message}
          </p>
        )}
      </div>
      <div className="mt-auto text-xs">{time}</div>
    </div>
  )
}
