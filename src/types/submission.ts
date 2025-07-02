export type Submission = {
  id: number
  name: string
  nickname: string
  generation: string
  title: string
  subject: string
  score: number
  cheatingCount: number
  startedAt: string
  submittedAt: string
}

// 단일 항목
export type SubmissionResult = {
  submission_id: number
  student: {
    nickname: string
    name: string
    generation: string
  }
  test: {
    title: string
    subject_title: string
  }
  score: number
  cheating_count: number
  started_at: string
  submitted_at: string
}

// API 응답 타입
export type SubmissionResponse = {
  count: number
  next: string | null
  previous: string | null
  results: SubmissionResult[]
}

export const mapSubmission = (s: SubmissionResult): Submission => ({
  id: s.submission_id,
  name: s.student.name,
  nickname: s.student.nickname,
  generation: s.student.generation,
  title: s.test.title,
  subject: s.test.subject_title,
  score: s.score,
  cheatingCount: s.cheating_count,
  startedAt: s.started_at,
  submittedAt: s.submitted_at,
})
