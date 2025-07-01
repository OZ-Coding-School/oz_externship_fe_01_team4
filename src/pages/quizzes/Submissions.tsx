import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import SearchIcon from '@assets/icons/search.svg?react'
import Icon from '@components/common/Icon'
import type { Submission } from '@custom-types/submission'
import Modal from '@components/common/Modal'
import { useState } from 'react'
import Pagination from '@components/common/data-table/Pagination'
import { useSort } from '@hooks/data-table/useSort'
import { usePagination } from '@hooks/data-table/usePagination'
import Dropdown from '@components/common/Dropdown'

// 목업 데이터
const mockSubmissions = {
  count: 42,
  next: null,
  previous: null,
  results: [
    {
      submission_id: 101,
      student: {
        nickname: 'codeMaster',
        name: '홍길동',
        generation: '프론트엔드 5기',
      },
      test: {
        title: 'HTML 기초 테스트',
        subject_title: '웹프로그래밍',
      },
      score: 85,
      cheating_count: 1,
      started_at: '2025-06-21T09:01:00',
      submitted_at: '2025-06-21T09:29:00',
    },
    {
      submission_id: 102,
      student: {
        nickname: 'devStar',
        name: '김영희',
        generation: '백엔드 4기',
      },
      test: {
        title: 'JavaScript 테스트',
        subject_title: '프론트엔드',
      },
      score: 92,
      cheating_count: 0,
      started_at: '2025-06-20T13:00:00',
      submitted_at: '2025-06-20T13:29:00',
    },
  ],
}

// 드롭다운 필드 정의
type DropdownFieldProps = {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
}

const DropdownField = ({
  label,
  id,
  value,
  onChange,
  options,
}: DropdownFieldProps) => (
  <div className="flex items-center justify-between gap-3 py-1">
    <span className="text-sm whitespace-nowrap">{label}</span>
    <Dropdown
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      options={options}
      wrapClassName="w-full max-w-[360px]"
    />
  </div>
)

// 테이블 헤더
const submissionHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '제목', dataKey: 'title' },
  { text: '과목명', dataKey: 'subject' },
  { text: '닉네임', dataKey: 'nickname' },
  { text: '이름', dataKey: 'name' },
  { text: '과정 | 기수', dataKey: 'generation' },
  { text: '부정행위 수', dataKey: 'cheatingCount' },
  { text: '점수', dataKey: 'score' },
  { text: '시험 참가 일시', dataKey: 'startedAt' },
  { text: '시험 종료 일시', dataKey: 'submittedAt' },
]

// 페이지 상수 추가
const COUNT_LIMIT = 20

const Submissions = () => {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 필터링 옵션 상태
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedGeneration, setSelectedGeneration] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  // 드롭다운 옵션
  const courseOptions = [
    { label: '전체 보기', value: '' },
    { label: '프론트엔드 부트캠프', value: '프론트엔드' },
    { label: '백엔드 부트캠프', value: '백엔드' },
  ]
  const generationOptions = [
    { label: '전체 보기', value: '' },
    { label: '4기', value: '4기' },
    { label: '5기', value: '5기' },
    { label: '6기', value: '6기' },
    { label: '7기', value: '7기' },
    { label: '8기', value: '8기' },
    { label: '9기', value: '9기' },
  ]
  const subjectOptions = [
    { label: '전체 보기', value: '' },
    { label: '웹 프로그래밍', value: '웹프로그래밍' },
    { label: '프론트엔드', value: '프론트엔드' },
  ]

  // 테이블 데이터
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

  // 필터링 데이터 저장
  const [filteredData, setFilteredData] = useState<Submission[]>(tableData)

  // 정렬
  const { sortedData, sortKey, sortOrder, sortByKey } = useSort(filteredData)

  // 페이지네이션
  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    item: sortedData,
    count: COUNT_LIMIT,
  })

  // 필터링 기능
  const filterHandler = () => {
    const result = tableData.filter((item) => {
      const [course, generation] = item.generation.split(' ')
      const isCourseMatch = selectedCourse ? course === selectedCourse : true
      const isGenMatch = selectedGeneration
        ? generation === selectedGeneration
        : true
      const isSubjectMatch = selectedSubject
        ? item.subject === selectedSubject
        : true
      return isCourseMatch && isGenMatch && isSubjectMatch
    })
    setFilteredData([...result])
    setIsModalOpen(false)
  }

  return (
    <section className="h-full bg-[#f9f9f9] px-3 py-11">
      <div className="flex flex-col bg-white px-8 py-10">
        <h2 className="text-lg font-semibold">쪽지 시험 응시 내역 조회</h2>
        <div className="self-end">
          <Button
            variant="VARIANT7"
            className="my-3 flex items-center justify-center gap-3 whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon icon={SearchIcon} className="w-[16px]" size={16} />
            과정별 필터링
          </Button>
        </div>
        {/* 모달 */}
        <Modal
          modalId={'filterModal'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="w-fit min-w-[500px] gap-2"
          paddingSize={36}
        >
          <h3 className="text-lg font-semibold">과정별 필터링</h3>
          <p className="mb-5 text-sm">
            필터를 적용할 과정과 기수를 선택해주세요.
          </p>
          {/* 필터링 드롭다운 */}
          <DropdownField
            label="과정"
            id="course"
            value={selectedCourse}
            onChange={setSelectedCourse}
            options={courseOptions}
          />
          <DropdownField
            label="기수"
            id="generation"
            value={selectedGeneration}
            onChange={setSelectedGeneration}
            options={generationOptions}
          />
          <DropdownField
            label="과목"
            id="subject"
            value={selectedSubject}
            onChange={setSelectedSubject}
            options={subjectOptions}
          />
          <p className="py-5">
            현재 선택된 과정은
            <span className="px-1 font-semibold text-primary-600">
              {selectedCourse} &gt; {selectedGeneration} &gt; {selectedSubject}
            </span>
            입니다.
          </p>
          <Button
            className="self-end whitespace-nowrap"
            variant="VARIANT1"
            onClick={filterHandler}
          >
            조회
          </Button>
        </Modal>
        {/* 리스트 테이블 */}
        <DataTable
          headerData={submissionHeaders}
          tableItem={paginatedData}
          isCheckBox={false}
          sortKeys={['score', 'submittedAt']}
          sortKey={sortKey}
          sortOrder={sortOrder}
          sortByKey={sortByKey}
          isTime={false}
        />
        {/* 페이지네이션 */}
        <div className="pt-8 pb-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
      </div>
    </section>
  )
}
export default Submissions
