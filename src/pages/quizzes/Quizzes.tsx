import Modal from '@components/Modal'
import Input from '@components/common/Input'
import FormRow from '@components/common/FormRow'
import Button from '@components/Button'
import DataTable from '@components/dataTable/DataTable'
import Pagination from '@components/dataTable/Pagination'
import { useSort } from '@hooks/dataTable/useSort'
import { useState } from 'react'
import { usePagination } from '@hooks/dataTable/usePagination'
import Dropdown from '@components/common/Dropdown'

const item = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      title: '파이썬 기초 쪽지시험',
      subject_name: 'Python',
      question_count: 10,
      submission_count: 45,
      created_at: '2025-06-01T12:00:00',
      updated_at: '2025-06-10T15:30:00',
    },
    {
      id: 2,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 3,
      title: 'qwewqe',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 4,
      title: 'qq',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 5,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 6,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 7,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 8,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 9,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 10,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 11,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 12,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 13,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 14,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 15,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
    {
      id: 16,
      title: 'Django 기초 쪽지시험',
      subject_name: 'Django',
      question_count: 8,
      submission_count: 37,
      created_at: '2025-06-05T09:00:00',
      updated_at: '2025-06-10T10:20:00',
    },
  ],
}

// 쪽지시험 관리
const Quizzes = () => {
  const { sortedData, sortByKey, sortKey, sortOrder } = useSort(item.results)

  const { currentPage, totalPages, paginatedData, goPrev, goNext } =
    usePagination({
      item: sortedData, // <--- 기존 item 대신 sortedData를 넘겨줌
      count: 10,
    })

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [title, setTitle] = useState('')

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const imageUrl = URL.createObjectURL(selectedFile)
      setPreview(imageUrl)
    }
  }
  return (
    <div className="mx-6 my-7">
      <p className="mb-2 text-[18px] font-[600]">쪽지시험 조회</p>
      <p className="mb-2 text-[14px] font-[600]">
        현재 선택된 과정은
        <span className="text-[#522193]">
          웹 개발 초격차 프론트엔드 부트캠프
        </span>
        입니다.
      </p>
      <div className="flex gap-2">
        {/*검색기능 구현 예정*/}
        <Input
          id="search"
          name="search"
          type="text"
          // value={}
          placeholder="검색어를 입력하세요."
          // onChange={(e) => setTitle(e.target.value)}
          wrapClassName="mb-2"
        />
        <Button variant="VARIANT1">조회</Button>
        <Button>🔍️ 과정별 필터링</Button>
      </div>
      <DataTable
        headerData={[
          { text: 'ID', dataKey: 'id' },
          { text: '제목', dataKey: 'title' },
          { text: '과목명', dataKey: 'subject_name' },
          { text: '총 문제 수', dataKey: 'question_count' },
          { text: '응시 수', dataKey: 'submission_count' },
          { text: '등록 일시', dataKey: 'created_at' },
          { text: '수정 일시', dataKey: 'updated_at' },
          { text: '', dataKey: 'deploy' },
        ]}
        tableItem={paginatedData} // 4. 페이지네이션된 데이터 전달
        isCheckBox
        sortKeys={['title']}
        sortKey={sortKey} // 5. 현재 정렬 키 전달
        sortOrder={sortOrder} // 6. 현재 정렬 방향 전달
        sortByKey={sortByKey} // 7. 정렬 함수 전달
        isTime
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goPrev={goPrev}
        goNext={goNext}
      />
      <div className="flex justify-end">
        <Button onClick={openModal}>생성</Button>
      </div>
      <Modal
        modalId="example-modal"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        paddingSize={32}
        isBackgroundDimmed
        closeButtonOffset={16}
      >
        <h1 className="mb-15 text-xl font-bold">쪽지시험 등록</h1>

        <div className="flex flex-col">
          {/* 제목 */}
          <FormRow htmlFor="title" labelText="제목" labelClassName="h-[50px]">
            <Input
              id="title"
              name="title"
              type="text"
              value={title}
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormRow>

          {/* 과목 */}
          <FormRow htmlFor="subject" labelText="과목" labelClassName="h-[50px]">
            <Dropdown
              id="subject"
              name="subject"
              value={selectedSubject}
              onChange={(val) => setSelectedSubject(val)}
              options={[
                { label: '과목을 선택하세요', value: '' },
                ...paginatedData.map((subject) => ({
                  label: String(subject.title ?? ''),
                  value: String(subject.id),
                })),
              ]}
            />
          </FormRow>

          {/* 로고 업로드 */}
          <FormRow
            htmlFor="logo"
            labelText="로고 등록"
            labelClassName="h-[191px] border-b border-[#DDDDDD]"
            valueClassName="h-[191px] border-b border-[#DDDDDD]"
          >
            <div className="mt-4 flex h-[132px] w-[146px] items-center justify-center overflow-hidden border border-gray-200 bg-[#F7F7F7]">
              {preview ? (
                <img
                  src={preview}
                  alt="미리보기"
                  className="max-h-[96px] max-w-[96px] object-contain"
                />
              ) : (
                <span className="text-sm">미리보기 없음</span>
              )}
            </div>

            <div className="mt-1 ml-4 flex items-center gap-5">
              <p className="text-[10px] whitespace-nowrap text-[#666666]">
                96 x 96 사이즈로 등록하세요.
              </p>
              <p className="max-w-[150px] truncate text-sm underline">
                {file && file.name}
              </p>
              <label className="cursor-pointer rounded border border-[#DDDDDD] bg-white px-3 py-1 text-sm text-gray-800 hover:bg-gray-50">
                파일 첨부
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </FormRow>

          {/* 버튼 */}
          <div className="mt-10 flex justify-end">
            <Button onClick={() => setIsOpen(false)}>생성</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Quizzes
