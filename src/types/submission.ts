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

export type SubmissionResponse = {
  count: number
  next: string | null
  previous: string | null
  results: {
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
  }[]
}