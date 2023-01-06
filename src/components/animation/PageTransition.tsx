import gsap from 'gsap'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'

const EASING = 'power4.inOut'
const DURATION = {
  in: 1,
  out: 1,
  dim: 0.2,
}

export const PageTransition: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const onPageEnter = (node: gsap.TweenTarget) => {
    const enterTimeline = gsap.timeline()
    enterTimeline.set(node, { autoAlpha: 1 }).fromTo(
      node,
      { xPercent: 100 },
      {
        xPercent: 0,
        duration: DURATION.in,
        ease: EASING,
      }
    )
  }

  const onPageExit = (node: gsap.TweenTarget) => {
    const exitTimeline = gsap.timeline()
    exitTimeline
      .set(node, { zIndex: -10 })
      .fromTo(
        node,
        { autoAlpha: 1 },
        { autoAlpha: 0.5, duration: DURATION.dim, ease: 'power1.inOut' }
      )
      .fromTo(
        node,
        {},
        {
          xPercent: -25,
          duration: DURATION.out - DURATION.dim,
          ease: EASING,
        }
      )
  }

  return (
    <TransitionGroup className="relative">
      <Transition
        key={router.asPath}
        timeout={DURATION.out * 1000}
        in={true}
        onEnter={onPageEnter}
        onExit={onPageExit}
        mountOnEnter={true}
        unmountOnExit={true}
        className="absolute w-[100svw]"
      >
        {children}
      </Transition>
    </TransitionGroup>
  )
}
