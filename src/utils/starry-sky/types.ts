import { RefObject } from 'react'
import StarrySky from './index'

export type StarrySkyType = Required<Partial<StarrySky>>

export interface Config {
  ele: RefObject<HTMLCanvasElement>
  width?: number
  height?: number
  color?: string
  lineColor?: string
  skyColor?: string
  count?: number
  length?: number
  easingFactor?: number
}

export interface Node {
  followMouse: boolean
  x: number
  y: number
  radius: number
  vx: number
  vy: number
}

export interface Edge {
  from: Node
  to: Node
}

export type DefaultConfig = Required<Omit<Config, 'ele'>>

export type ResultConfig = Config & DefaultConfig
