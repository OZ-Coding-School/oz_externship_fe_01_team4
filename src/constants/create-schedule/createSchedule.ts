export const VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: '모든 항목을 입력해주세요.',
  INVALID_DATE_RANGE: '시작 일시가 종료 일시보다 늦을 수 없습니다.',
  INVALID_DURATION: '진행 시간은 1분 이상이어야 합니다.',
  SUCCESS: '쪽지시험 배포 일정이 등록되었습니다!',
  API_ERROR: '일정 등록에 실패했습니다. 다시 시도해주세요.',
} as const

export const FORM_LABELS = {
  MODAL_TITLE: '쪽지시험 배포',
  QUIZ_SELECT: '쪽지시험',
  CLASS_SELECT: '기수',
  DURATION: '진행 시간 (분)',
  START_DATETIME: '시작 일시',
  END_DATETIME: '종료 일시',
  START_DATE_ARIA: '시작 날짜',
  START_TIME_ARIA: '시작 시간',
  END_DATE_ARIA: '종료 날짜',
  END_TIME_ARIA: '종료 시간',
  CANCEL_BUTTON: '취소',
  SUBMIT_BUTTON: '생성',
  SUBMITTING_BUTTON: '등록 중...',
} as const

export const FORM_PLACEHOLDERS = {
  QUIZ_SELECT: '쪽지시험을 선택하세요',
  CLASS_SELECT: '기수를 선택하세요',
  DURATION: '진행 시간 (분)',
} as const

export const MODAL_CONFIG = {
  ID: 'schedule-create',
  WIDTH: 'w-[640px]',
  PADDING_SIZE: 32,
} as const

export const INPUT_CONSTRAINTS = {
  MIN_DURATION: 1,
} as const
