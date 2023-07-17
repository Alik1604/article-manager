import Link from "next/link";

function Pagination({
  pageNumbers,
  page,
}: {
  pageNumbers: number[];
  page: number;
}) {
  const startIndex = Math.max(page - 3, 0);
  const visiblePageNumbers = pageNumbers.slice(startIndex, startIndex + 5);

  return (
    <div className="flex flex-row gap-8 mb-4 mt-8">
      {visiblePageNumbers.map((pageNumber) => (
        <Link href={`/${pageNumber}`}>
          <div key={pageNumber}>{pageNumber}</div>
        </Link>
      ))}
    </div>
  );
}

export default Pagination;
