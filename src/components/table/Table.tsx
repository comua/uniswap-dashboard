import React, { FC, PropsWithChildren } from 'react'

interface ITableProps {
  page: number
  setPage: (page: number) => void
  lastPage?: number
}

export const Table: FC<PropsWithChildren<ITableProps>> = ({
  page,
  setPage,
  lastPage,
  children,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded bg-zinc-900 p-16 tablet:p-24">
      <ul className="flex w-full flex-col items-center justify-center">{children}</ul>
      <div className="mt-16 flex w-full justify-between tablet:mt-24 tablet:w-[24rem]">
        {lastPage && (
          <button
            disabled={page === 0}
            onClick={() => setPage(0)}
            className="disabled:text-zinc-700"
          >{`<<`}</button>
        )}
        <button
          disabled={page === 0}
          onClick={() => setPage(Math.max(page - 1, 0))}
          className="disabled:text-zinc-700"
        >{`<`}</button>
        <div>
          Page {page + 1} <span>{lastPage && `of ${lastPage}`}</span>
        </div>
        <button
          disabled={page + 1 === lastPage}
          onClick={() => setPage(page + 1)}
          className="disabled:text-zinc-700"
        >
          {`>`}
        </button>
        {lastPage && (
          <button
            disabled={page + 1 === lastPage}
            onClick={() => setPage(lastPage - 1)}
            className="disabled:text-zinc-700"
          >{`>>`}</button>
        )}
      </div>
    </div>
  )
}
