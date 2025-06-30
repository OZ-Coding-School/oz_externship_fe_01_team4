type Props = {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
}

const MAX_PAGE_BUTTONS = 5

export default function Pagination({
  currentPage,
  totalPages,
  goToPage,
}: Props) {
  const getPageNumbers = () => {
    const half = Math.floor(MAX_PAGE_BUTTONS / 2)
    let start = Math.max(1, currentPage - half)
    let end = start + MAX_PAGE_BUTTONS - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - MAX_PAGE_BUTTONS + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  return (
    <div className="mt-2 flex items-center justify-center text-[14px] text-[#666666]">
      <button
        className="mr-3"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      >
        ≪
      </button>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-3"
      >
        &lt;
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`mx-1 w-[12px] ${page === currentPage ? 'text-[#000000] underline' : ''}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-3"
      >
        &gt;
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="ml-3"
      >
        ≫
      </button>
    </div>
  )
}
