type AuthorAvatarIconProps = {
  size?: number
}

export function AuthorAvatarIcon({size = 26}: AuthorAvatarIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{display: 'block', flexShrink: 0}}
    >
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 17.25C8.67 15.73 10.2 15 12 15s3.33.73 4.5 2.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
