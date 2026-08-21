import {LyraPageGradientsTypes} from '@/lib/types/page-gradients'

type PageGradientResult = {
  type: LyraPageGradientsTypes
}

const map: Record<Exclude<LyraPageGradientsTypes, 'none'>, string> = {
  home: 'var(--lyra-home-gradient)',
  page: 'var(--lyra-page-gradient)',
  pageblue: 'var(--lyra-pageblue-gradient)',
  post: 'var(--lyra-post-gradient)',
  product: 'var(--lyra-product-gradient)',
  solution: 'var(--lyra-solution-gradient)',
  guideblue: 'var(--lyra-guideblue-gradient)',
  guidegreen: 'var(--lyra-guidegreen-gradient)',
  guidegray: 'var(--lyra-guidegray-gradient)',
}

export default function PageGradientStyle({type}: PageGradientResult) {
  const value = type === 'none' ? 'var(--color-dark)' : map[type]
  return <style>{`:root{--lyra-active-gradient:${value};}`}</style>
}
