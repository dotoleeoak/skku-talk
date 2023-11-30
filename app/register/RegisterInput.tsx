import { clsx } from 'clsx'
import type { HTMLInputTypeAttribute } from 'react'

interface Props {
  attrs: any
  error?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

export default function RegisterInput({
  attrs,
  error,
  placeholder,
  type = 'text'
}: Props) {
  return (
    <div className="flex w-full flex-col">
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-b-gray-600',
          'border-x-0 border-b-2 border-t-0  pl-0 text-lg placeholder:text-gray-400 '
        )}
        {...attrs}
      />
      {error && <p className="py-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
