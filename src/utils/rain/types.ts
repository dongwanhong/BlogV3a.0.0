import { RefObject } from 'react'
import Rain from './index'

export type RainType = Required<Partial<Rain>>

export interface Config {
  ele: RefObject<HTMLCanvasElement>
  width?: number
  height?: number
  color?: string
  skyColor?: string
  count?: number
  tally?: number
}

export interface WaterDrop {
  x: number
  y: number
  angle: number
  length: number
  vy: number
  boom: boolean
  die: boolean
}

export interface Droplet {
  oriX: number
  oriY: number
  currentX: number
  currentY: number
  angle: number
  r: number
  R: number
  vy: number
  isX: boolean
  die: boolean
}

export type DefaultConfig = Required<Omit<Config, 'ele'>>

export type ResultConfig = Config & DefaultConfig
