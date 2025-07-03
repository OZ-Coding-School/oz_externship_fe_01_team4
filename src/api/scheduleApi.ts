import type { SchedulePayload } from '@custom-types/createSchedule'
import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'

// API 기본 URL - 환경변수 사용
const API_BASE_URL = '/api/v1/admin'

// HTTP 요청 유틸리티
const request = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  const token = localStorage.getItem('access_token')

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
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

    // 204 No Content면 undefined 반환
    if (response.status === 204) {
      return undefined
    }

    // 그 외에는 JSON 파싱해서 반환
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
  setDeploySchedule: (payload: SchedulePayload): Promise<void> =>
    request(`/test-deployments/`, {
      method: 'POST',
      body: JSON.stringify({
        test_id: payload.test_id,
        generation_id: payload.generation_id,
        duration_time: payload.duration_time,
        open_at: payload.open_at,
        close_at: payload.close_at,
      }),
    }),
} as const
