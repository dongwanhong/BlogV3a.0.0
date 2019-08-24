import React, { SFC } from 'react'

interface Props {
  title: string
  description?: string
}

const Header: SFC<Props> = (props: Props) => {
  const { title, description } = props

  return (
    <header>
      <h1 className="title">{title}</h1>
      {description ? <div className="description">{description}</div> : null}
    </header>
  )
}

export default Header
