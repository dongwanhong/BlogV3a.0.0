import React from 'react'
import { Link as RouterLink, LinkProps } from 'react-router-dom'
import URL from 'url-parse'

const Link = (props: LinkProps): React.ReactElement => {
  const { to, children, className } = props
  const localTo = to.toString()
  const { origin, pathname, query } = new URL(localTo)
  const linkProps = {
    ...props,
    to: pathname + query
  }

  return origin === window.location.origin ? (
    <RouterLink {...linkProps} />
  ) : (
    <a href={localTo} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default Link
