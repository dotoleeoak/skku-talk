import clsx from 'clsx'
import styles from './styles.module.css'

interface Props {
  className?: string
  src: string
}

export default function ProfileImage({ className, src }: Props) {
  return (
    <div className={clsx(className, styles.profileImage)}>
      <svg className="h-full w-full" viewBox="0 0 88 88">
        <defs>
          <path
            id="shapeSquircle"
            d="M44,0 C76.0948147,0 88,11.9051853 88,44 C88,76.0948147 76.0948147,88 44,88 C11.9051853,88 0,76.0948147 0,44 C0,11.9051853 11.9051853,0 44,0 Z"
          />
          <clipPath id="clipSquircle">
            <use xlinkHref="#shapeSquircle" />
          </clipPath>
        </defs>
        <image
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#clipSquircle)"
          xlinkHref={src}
        />
      </svg>
    </div>
  )
}
