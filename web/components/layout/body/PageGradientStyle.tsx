import {ArrPageGradientsTypes} from '@/lib/types/page-gradients'

type PageGradientResult = {
  type: ArrPageGradientsTypes
}

const map: Record<Exclude<ArrPageGradientsTypes, 'none'>, string> = {
  home: 'var(--arr-home-gradient)',
  page: 'var(--arr-page-gradient)',
  pageblue: 'var(--arr-pageblue-gradient)',
  post: 'var(--arr-post-gradient)',
  product: 'var(--arr-product-gradient)',
  solution: 'var(--arr-solution-gradient)',
  guideblue: 'var(--arr-guideblue-gradient)',
  guidegreen: 'var(--arr-guidegreen-gradient)',
  guidegray: 'var(--arr-guidegray-gradient)',
}

export default function PageGradientStyle({type}: PageGradientResult) {
  const value = type === 'none' ? 'var(--color-dark)' : map[type]
  return <style>{`:root{--arr-active-gradient:${value};}`}</style>
}
