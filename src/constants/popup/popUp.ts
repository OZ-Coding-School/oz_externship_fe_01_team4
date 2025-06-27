export const POP_UP_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  DELETE_CONFIRM: 'delete_confirm',
} as const

export type PopUpType = (typeof POP_UP_TYPE)[keyof typeof POP_UP_TYPE]
