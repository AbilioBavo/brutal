'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: (updater: PaginationState | ((old: PaginationState) => PaginationState)) => void;
  pageCount?: number;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  pagination,
  onPaginationChange,
  pageCount,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
    manualPagination: !!pagination,
    pageCount: pageCount ?? -1,
    onPaginationChange,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-pink-100 border-t-pink-500" />
          <p className="font-serif text-sm font-light italic text-gray-400">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-dashed border-pink-200 bg-white/60 py-20 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50">
            <svg className="h-7 w-7 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <p className="font-serif text-lg font-light italic text-gray-700">
            Nenhum registro encontrado
          </p>
          <p className="text-sm text-gray-400">
            Não há dados para exibir no momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-pink-100/60 bg-white/80 shadow-[0_4px_40px_rgba(236,72,153,0.06)] backdrop-blur-sm">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-pink-100/60">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex cursor-pointer select-none items-center gap-2 transition-colors hover:text-pink-600'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                          ),
                          desc: (
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className={`border-b border-pink-50/80 transition-all duration-300 last:border-0 ${
                  onRowClick
                    ? 'cursor-pointer hover:bg-linear-to-r hover:from-pink-50/50 hover:to-rose-50/50'
                    : ''
                } ${rowIndex % 2 === 0 ? '' : 'bg-pink-25/20'}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap px-6 py-4 text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && onPaginationChange && (
        <div className="flex items-center justify-between rounded-2xl border border-pink-100/60 bg-white/60 px-6 py-3 backdrop-blur-sm">
          <p className="text-xs text-gray-400">
            Página <span className="font-medium text-gray-600">{pagination.pageIndex + 1}</span> de{' '}
            <span className="font-medium text-gray-600">{pageCount ?? '?'}</span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onPaginationChange?.((old) => ({
                  ...old,
                  pageIndex: old.pageIndex - 1,
                }))
              }
              disabled={pagination.pageIndex === 0}
              className="rounded-xl border-pink-100 text-gray-500 transition-all hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600 disabled:opacity-40"
            >
              <svg className="mr-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onPaginationChange?.((old) => ({
                  ...old,
                  pageIndex: old.pageIndex + 1,
                }))
              }
              disabled={
                pageCount ? pagination.pageIndex >= pageCount - 1 : false
              }
              className="rounded-xl border-pink-100 text-gray-500 transition-all hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600 disabled:opacity-40"
            >
              Próxima
              <svg className="ml-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
