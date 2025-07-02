export const SCHEDULE_CONSTANTS = {
  VALIDATION: {
    MESSAGES: {
      REQUIRED_FIELDS: '모든 항목을 입력해주세요.',
      INVALID_DATE_RANGE: '시작 일시가 종료 일시보다 늦을 수 없습니다.',
      INVALID_DURATION: '진행 시간은 1분 이상이어야 합니다.',
    },
    CONSTRAINTS: {
      MIN_DURATION_TIME: 1,
      MAX_COURSE_NAME: 20,
    },
  },

  API: {
    SUCCESS_MESSAGE: '쪽지시험 배포 일정이 등록되었습니다!',
    ERROR_MESSAGE: '일정 등록에 실패했습니다. 다시 시도해주세요.',
  },

  UI: {
    LABELS: {
      MODAL_TITLE: '쪽지시험 배포',
      QUIZ_INFO: {
        TEST_NAME: '시험명',
        SUBJECT_NAME: '과목명',
      },
      FORM: {
        COURSE_NAME: '과정',
        GENERATION_SELECT: '기수',
        DURATION_TIME: '시험 시간 (분)',
        OPEN_AT: '시험 시작 일시',
        CLOSE_AT: '시험 종료 일시',
      },
      ARIA: {
        START_DATE: '시작 날짜',
        START_TIME: '시작 시간',
        END_DATE: '종료 날짜',
        END_TIME: '종료 시간',
      },
      BUTTON: {
        SUBMIT: '생성',
        SUBMITTING: '등록 중...',
      },
    },

    PLACEHOLDERS: {
      COURSE_NAME: '과정을 선택하세요',
    },

    MODAL: {
      ID: 'schedule-create',
      WIDTH: 'w-[790px]',
      HEIGHT: 'h-[483x]',
      PADDING_SIZE: 30,
    },

    STYLES: {
      MODAL: {
        CONTAINER: 'flex flex-col gap-4',
        TITLE: 'text-[18px] font-semibold text-black',
      },
      QUIZ_INFO: {
        CONTAINER: 'rounded-md bg-gray-50 p-4',
        ITEM_CONTAINER: 'mb-2 last:mb-0',
        LABEL: 'font-medium text-[14px] text-[#666666]',
        VALUE: 'text-black text-[14px]',
      },
      FORM_ELEMENTS: {
        FORM_ELEMENTS: {
          BORDER_FIRST: 'border-t border-b border-[#DDDDDD]',
          BORDER: 'border-b border-[#DDDDDD]',
        },
      },
    },

    FORM_FIELDS: {
      ROW_CONTAINER: 'flex h-[50px] items-center',
      REQUIRED_INDICATOR_COLOR: 'text-[#CC0A0A]',
      INPUT_WRAPPER_OFFSET: 'm-[7px]',
      DURATION_UNIT_TEXT: '분',

      // Input,Label Sizes
      SIZES: {
        LABEL: 'w-[200px]',
        COURSE_DROPDOWN: 'w-[340px] h-[36px]',
        GENERATION_DROPDOWN: 'w-[100px] h-[36px]',
        DURATION_INPUT: 'w-[80px] h-[36px]',
        DATE_INPUT: 'w-[150px] h-[36px]',
        TIME_INPUT: 'w-[100px] h-[36px]',
      },
    },
  },
} as const
