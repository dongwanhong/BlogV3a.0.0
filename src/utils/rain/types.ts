import { RefObject } from 'react'

export interface Config {
  ele: RefObject<HTMLCanvasElement>
  width?: number
  height?: number
  color?: string
  skyColor?: string
  count?: number
}

export type DefaultConfig = Required<Omit<Config, 'ele'>>

export type ResultConfig = Config & DefaultConfig

export interface WaterDrop {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  die: boolean
}
