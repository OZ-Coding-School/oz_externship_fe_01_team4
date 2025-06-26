import DataTable from '@components/dataTable/DataTable'
import type { Submission } from '@customType/submission'
import { mockSubmissions } from '@mocks/submissions.mock'

// 헤더
const submissionHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '제목', dataKey: 'title' },
  { text: '과목명', dataKey: 'subject' },
  { text: '닉네임', dataKey: 'nickname' },
  { text: '이름', dataKey: 'name' },
  { text: '기수', dataKey: 'generation' },
  { text: '부정행위 수', dataKey: 'cheatingCount' },
  { text: '점수', dataKey: 'score' },
  { text: '시험 참가 일시', dataKey: 'startedAt' },
  { text: '시험 종료 일시', dataKey: 'submittedAt' },
]

const SubmissionListPage = () => {
  const tableData: Submission[] = mockSubmissions.results.map((s) => ({
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
  }))
  return (
    <section className="h-full bg-[#f9f9f9] px-3 py-11">
      <div className="bg-white px-8 py-10">
        <h2 className="mb-4 text-lg">쪽지시험 응시 내역 조회</h2>
        <DataTable
          headerData={submissionHeaders}
          tableItem={tableData}
          isCheckBox={false}
          sortKeys={['score', 'submittedAt']}
          sortKey={'id'}
          sortOrder={'desc'}
          sortByKey={() => {}}
          isTime={false}
        />
      </div>
    </section>
  )
}
export default SubmissionListPage
