import type { SchedulePayload, Quiz } from '@custom-types/createSchedule'

// API 설정
const API_BASE_URL = 'api/v1/admin/tests'

// HTTP 요청 유틸리티
const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: '알 수 없는 오류' }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('네트워크 오류가 발생했습니다')
  }
}

// 쪽지시험 API
export const quizAPI = {
  // 목록 조회
  getList: (): Promise<Quiz[]> => request<Quiz[]>('/'),

  // 배포 일정 설정 (SchedulePayload 타입 사용)
  setDeploySchedule: (payload: SchedulePayload): Promise<void> =>
    request<void>(`/${payload.testId}/deploy-schedule`, {
      method: 'POST',
      body: JSON.stringify({
        classId: payload.classId,
        durationMinutes: payload.durationMinutes,
        startAt: payload.startAt,
        endAt: payload.endAt,
      }),
    }),

  // 배포 일정 설정 후 목록 새로고침 (편의 메서드)
  async deployAndRefresh(payload: SchedulePayload): Promise<Quiz[]> {
    await this.setDeploySchedule(payload)
    return this.getList()
  },
} as const
