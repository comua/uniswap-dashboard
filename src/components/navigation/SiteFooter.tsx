import React from 'react'
import { GoMarkGithub } from 'react-icons/go'

export const SiteFooter = () => {
  return (
    <footer className="invisible fixed bottom-24 right-24 mobile:visible">
      <a
        target="_blank"
        href="https://github.com/comua/uniswap-dashboard"
        className="ml-16 tablet:ml-24"
        rel="noreferrer"
      >
        <GoMarkGithub size="2.4rem" />
      </a>
    </footer>
  )
}
