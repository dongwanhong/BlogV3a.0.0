import React, { ReactElement, ReactNode } from 'react'
import { Coordinate } from '../index'

interface Props {
  children?: ReactNode
  coordinate?: Coordinate
  radius?: number
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const BallItem: React.StatelessComponent<Props> = (props: Props): ReactElement => {
  const { children, coordinate, radius = 0, onClick = () => {}, className = '' } = props
  const { x = 0, y = 0, z = 0 } = coordinate || {}
  const alpha = (z + radius) / (2 * radius)
  const fontSize = 12 + alpha * 4
  // const zIndex = 9 + alpha * 90
  const styels = {
    transform: `translate(${radius + y}px, ${radius + x}px)`,
    // top: `${radius + y}px`,
    // left: radius + x,
    fontSize,
    // zIndex,
    opacity: alpha
  }

  return (
    <div
      style={styels}
      className={className ? `ball-item ${className}` : 'ball-item'}
      onClick={e => onClick(e)}
    >
      {children}
    </div>
  )
}

export default BallItem
