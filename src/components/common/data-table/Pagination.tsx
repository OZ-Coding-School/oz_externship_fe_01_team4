type Props = {
  currentPage: number
  totalPages: number
  goPrev: () => void
  goNext: () => void
}

export default function Pagination({
  currentPage,
  totalPages,
  goPrev,
  goNext,
}: Props) {
  return (
    <div className="mt-2 flex justify-center gap-2">
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className="rounded border px-3 py-1"
      >
        이전
      </button>
      <span className="flex items-center">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        className="rounded border px-3 py-1"
      >
        다음
      </button>
    </div>
  )
}
