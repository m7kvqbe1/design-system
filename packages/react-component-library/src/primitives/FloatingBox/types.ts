import { FLOATING_BOX_ARROW_POSITION, FLOATING_BOX_SCHEME } from './constants'

export type FloatingBoxSchemeType =
  | typeof FLOATING_BOX_SCHEME.LIGHT
  | typeof FLOATING_BOX_SCHEME.DARK

export type FloatingBoxPositionType =
  | typeof FLOATING_BOX_ARROW_POSITION.LEFT_BOTTOM
  | typeof FLOATING_BOX_ARROW_POSITION.LEFT_TOP
  | typeof FLOATING_BOX_ARROW_POSITION.RIGHT_BOTTOM
  | typeof FLOATING_BOX_ARROW_POSITION.RIGHT_TOP
  | typeof FLOATING_BOX_ARROW_POSITION.TOP_LEFT
  | typeof FLOATING_BOX_ARROW_POSITION.TOP_RIGHT
  | typeof FLOATING_BOX_ARROW_POSITION.BOTTOM_LEFT
  | typeof FLOATING_BOX_ARROW_POSITION.BOTTOM_RIGHT
