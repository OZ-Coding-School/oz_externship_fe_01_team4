import type { SchedulePayload, Quiz } from '@custom-types/createSchedule'
import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'

const API_BASE_URL = 'api/v1/admin'

// HTTP 요청 유틸리티
const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
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
        .catch(() => ({ message: SCHEDULE_CONSTANTS.API.ERROR_MESSAGE }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    // 응답이 없을 경우 (204 No Content 등)를 처리
    if (response.status === 204) {
      return undefined as T // Promise<void>를 위한 처리
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(SCHEDULE_CONSTANTS.API.ERROR_MESSAGE)
  }
}

// 쪽지시험 API
export const quizAPI = {
  getList: (): Promise<Quiz[]> => request<Quiz[]>('/tests'),

  setDeploySchedule: (payload: SchedulePayload): Promise<void> =>
    request<void>(`/test-deployments/`, {
      method: 'POST',
      body: JSON.stringify({
        test_id: payload.test_id,
        generation_id: payload.generation_id,
        duration_time: payload.duration_time,
        open_at: payload.open_at,
        close_at: payload.close_at,
      }),
    }),

  // 배포 일정 설정 후 목록 새로고침
  async deployAndRefresh(payload: SchedulePayload): Promise<Quiz[]> {
    await this.setDeploySchedule(payload)
    return this.getList()
  },
} as const
