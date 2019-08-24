import React, { SFC } from 'react'
import { Link } from '@/components'

interface RefInfo {
  key: string | number
  text: string
  to: string
}

interface Props {
  refs: RefInfo[]
}

const Reference: SFC<Props> = props => {
  const { refs } = props

  return (
    <ul>
      {refs.map(item => (
        <li key={item.key}>
          <Link to={item.to}>{item.text}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Reference
