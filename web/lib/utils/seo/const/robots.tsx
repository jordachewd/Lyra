export const noIndexRobots = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
  },
}

export const indexRobots = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
    'max-snippet': -1,
  },
}
