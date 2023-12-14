import clsx from 'clsx'
import styles from './styles.module.css'
import Image from 'next/image'

interface Props {
  className?: string
  height: number
  width: number
  src: string
}

export default function ProfileImage({ src, className, height, width }: Props) {
  return (
    <div
      className={clsx(styles.profileImage, className)}
      style={{ height, width }}
    >
      <svg width="0" height="0">
        <defs>
          <clipPath id="squircle" clipPathUnits="objectBoundingBox">
            <path d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <Image
        src={src}
        alt="Profile Image"
        height={height}
        width={width}
        style={{ clipPath: 'url(#squircle)' }}
      />
    </div>
  )
}
