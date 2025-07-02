import Modal from '@components/common/Modal'
import Input from '@components/common/Input'
import FormRow from '@components/common/FormRow'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import { useSort } from '@hooks/data-table/useSort'
import { useState } from 'react'
import { usePagination } from '@hooks/data-table/usePagination'
import Dropdown from '@components/common/Dropdown'
import { useCustomToast } from '@hooks/toast/useToast'
import { cn } from '@utils/cn'
import ScheduleModal from '@components/create-schedule/ScheduleModal'
import { useScheduleStore } from '@store/create-schedule/scheduleStore'
import { quizAPI } from '../../api/scheduleApi'
import type { SchedulePayload } from '@custom-types/createSchedule'

// 표제목 상수화;
const TableHeaderItem = [
  { text: 'ID', dataKey: 'id' },
  { text: '제목', dataKey: 'title' },
  { text: '과목명', dataKey: 'subject_name' },
  { text: '총 문제 수', dataKey: 'question_count' },
  { text: '응시 수', dataKey: 'submission_count' },
  { text: '등록 일시', dataKey: 'created_at' },
  { text: '수정 일시', dataKey: 'updated_at' },
  { text: '', dataKey: 'deploy' },
]

// mock 데이터
const quizData = [
  {
    id: 1,
    title: 'React & Redux 데일리 쪽지시험',
    subject_name: 'React & Redux',
    question_count: 10,
    submission_count: 25,
    created_at: '2025.02.01 11:22:28',
    updated_at: '2025.02.28 11:22:28',
  },
]

const coursesData = [
  { id: 1, name: '웹 개발 초급자 프론트엔드 부트캠프' },
  { id: 2, name: 'AI 백엔드 심화과정' },
]

const generationsData = [
  { id: 8, name: '8기' },
  { id: 9, name: '9기' },
  { id: 10, name: '10기' },
]

const SortItem = ['title'] // 정렬할 데이터 지정

// 쪽지시험 관리
const Quizzes = () => {
  const [dummySearch, setDummySearch] = useState('')
  // Store 연결
  const { isModalOpen, selectedQuiz, openScheduleModal, closeScheduleModal } =
    useScheduleStore()

  // 배포 버튼 클릭 핸들러
  const handleDeployClick = (quizData: any) => {
    openScheduleModal({
      test_id: quizData.id,
      test_title: quizData.title,
      subject_title: quizData.subject_name,
    })
  }

  // 스케줄 제출 핸들러
  const handleScheduleSubmit = async (payload: SchedulePayload) => {
    await quizAPI.setDeploySchedule(payload)
  }
  const { sortedData, sortByKey, sortKey, sortOrder } = useSort(quizData)

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    item: sortedData, // <--- 기존 item 대신 sortedData를 넘겨줌
    count: 10,
  })

  const toast = useCustomToast()

  const [isTitle, setIsTitle] = useState(true)
  const [isSelectedSubject, setIsSelectedSubject] = useState(true)
  const [isImageFile, setIsImageFile] = useState(true)

  const handleSubmit = () => {
    let isValid = true

    setIsTitle(true)
    setIsSelectedSubject(true)

    if (!title.trim()) {
      setIsTitle(false)
      isValid = false
    }

    if (!selectedSubject) {
      setIsSelectedSubject(false)
      isValid = false
    }

    if (!file) {
      setIsImageFile(false)
      isValid = false
    }

    if (!isValid) return

    setIsOpen(false)
    resetForm()
    setIsTitle(true)
    setIsSelectedSubject(true)

    toast.success('성공적으로 쪽지시험이 생성되었습니다.', {
      style: 'style4',
      duration: 5000,
      hasActionButton: false,
      actionLabel: '확인',
      hasCloseButton: true,
      hasIcon: true,
    })
  }

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const resetForm = () => {
    setTitle('')
    setSelectedSubject('')
    setIsTitle(true)
    setIsSelectedSubject(true)
    setIsImageFile(true)
    setPreview(null)
    setFile(null)
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

  //드롭다운 옵션 상수화
  const options = [
    { label: '과목을 선택하세요', value: '' },
    ...paginatedData.map((subject) => ({
      label: String(subject.title ?? ''),
      value: String(subject.id),
    })),
  ]

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
          value={dummySearch}
          onChange={(e) => setDummySearch(e.target.value)}
          placeholder="검색어를 입력하세요."
          wrapClassName="mb-2"
        />
        <Button variant="VARIANT6">조회</Button>
        <div className="ml-auto flex">
          <Button variant="VARIANT7">🔍️ 과정별 필터링</Button>
        </div>
      </div>

      <DataTable
        headerData={TableHeaderItem} // 표제목,열 개수
        tableItem={paginatedData} // 페이지네이션된 데이터 전달
        isCheckBox={false} // 체크박스 여부
        sortKeys={SortItem} // 정렬할 데이터 지정
        sortKey={sortKey} // 현재 정렬 키 전달
        sortOrder={sortOrder} // 현재 정렬 방향 전달
        sortByKey={sortByKey} // 정렬 함수 전달
        isTime // 시간 표시 여부
        onDeployClick={handleDeployClick} // 배포 버튼 클릭 핸들러
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />

      <div className="flex justify-end">
        <Button onClick={openModal}>생성</Button>
      </div>
      {/* 스케줄 배포 모달 */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={closeScheduleModal}
        test_id={selectedQuiz?.test_id || 0}
        test_title={selectedQuiz?.test_title || ''}
        subject_title={selectedQuiz?.subject_title || ''}
        courses={coursesData}
        generations={generationsData}
        onSubmit={handleScheduleSubmit}
      />
      <Modal
        modalId="example-modal"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          resetForm()
          setIsTitle(true)
          setIsSelectedSubject(true)
        }}
        paddingSize={32}
        isBackgroundDimmed
        closeButtonOffset={16}
      >
        <h1 className="mb-[53px] text-xl font-bold">쪽지시험 등록</h1>

        <div className="flex flex-col">
          {/* 제목 */}
          <FormRow htmlFor="title" labelText="제목" labelClassName="h-[50px]">
            <div className="flex w-full items-center gap-2">
              <Input
                id="title"
                name="title"
                type="text"
                value={title}
                placeholder="제목을 입력하세요."
                onChange={(e) => {
                  setTitle(e.target.value)
                  setIsTitle(true)
                }}
              />
              {!isTitle && (
                <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                  제목 입력 필수
                </p>
              )}
            </div>
          </FormRow>

          {/* 과목 */}
          <FormRow htmlFor="subject" labelText="과목" labelClassName="h-[50px]">
            <div className="flex w-full items-center gap-2">
              <Dropdown
                id="subject"
                name="subject"
                value={selectedSubject}
                onChange={(val) => {
                  setSelectedSubject(val)
                  setIsSelectedSubject(true)
                }}
                options={options}
              />
              {!isSelectedSubject && (
                <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                  과목 선택 필수
                </p>
              )}
            </div>
          </FormRow>
          {/* 로고 업로드 */}
          <FormRow
            htmlFor="logo"
            labelText="로고 등록"
            labelClassName="h-[191px] border-b border-[#DDDDDD]"
            valueClassName="h-[191px] border-b border-[#DDDDDD]"
          >
            <div
              className={cn(
                `mt-4 h-[132px] w-[146px] overflow-hidden border border-[#DDD] bg-[#F7F7F7]`,
                `flex items-center justify-center`
              )}
            >
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
              {!isImageFile && (
                <p className="text-sm text-[#CC0A0A]">
                  로고 업로드를 해주세요.
                </p>
              )}
              <label className="cursor-pointer rounded border border-[#DDDDDD] bg-white px-3 py-1 text-sm">
                파일 첨부
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    handleFileChange(e)
                    setIsImageFile(true)
                  }}
                />
              </label>
            </div>
          </FormRow>

          {/* 버튼 */}
          <div className="mt-[38px] flex justify-end">
            <Button
              onClick={() => {
                handleSubmit()
              }}
            >
              생성
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Quizzes
