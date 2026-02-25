'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import apiClient from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import type { FindOneClientModelSchema } from '@/src/gen/models/FindOneClientModelSchema';
import { motion } from 'framer-motion';

type ClientsResponse = {
  total: number;
  results: number;
  data: FindOneClientModelSchema[];
};

export default function ClientsPage() {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const calculateAge = (birthDateString: string) => {
    if (!birthDateString) return 0;
    const birthDate = new Date(birthDateString);
    if (isNaN(birthDate.getTime())) return 0;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['clients', pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const res = await apiClient.get<{ data: ClientsResponse }>('/api/clients', {
        params: {
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
        },
      });
      return res.data.data;
    },
  });

  const columns: ColumnDef<FindOneClientModelSchema>[] = [
    {
      accessorKey: 'firstName',
      header: 'Nome',
      cell: ({ row }) => (
        <div className="font-medium text-gray-800">
          {row.original.firstName} {row.original.lastName}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <span className="text-gray-600">{row.original.email}</span>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Telefone',
      cell: ({ row }) => (
        <span className="text-gray-600">{row.original.phone}</span>
      ),
    },
    {
      accessorKey: 'age',
      header: 'Idade',
      cell: ({ row }) => {
        const age = calculateAge(row.original.birthDate);
        return (
          <Badge className="rounded-lg border-pink-100 bg-pink-50 text-pink-600 hover:bg-pink-100">
            {age} anos
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Cadastro',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return (
          <span className="text-gray-500">
            {date.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
        );
      },
    },
  ];

  const handleRowClick = (client: FindOneClientModelSchema) => {
    router.push(`/dashboard/clients/${client.id}`);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-[0_4px_40px_rgba(239,68,68,0.08)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <svg className="h-7 w-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="font-serif text-lg font-light italic text-red-800">
            Erro ao carregar clientes
          </p>
          <p className="mt-2 text-sm text-red-500">
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-pink-400">
            Gestão
          </p>
          <h1 className="bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 bg-clip-text font-serif text-4xl font-light italic tracking-wide text-transparent">
            Clientes
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-px w-10 bg-linear-to-r from-pink-300 to-transparent" />
            <p className="text-sm font-light text-gray-500">
              Visualize e gerencie os registros de clientes do sistema
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 flex gap-4"
          >
            <div className="rounded-2xl border border-pink-100/60 bg-white/80 px-6 py-4 shadow-[0_2px_20px_rgba(236,72,153,0.06)] backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300">Total</p>
              <p className="mt-1 font-serif text-2xl font-light italic text-gray-800">{response.total}</p>
            </div>
            <div className="rounded-2xl border border-pink-100/60 bg-white/80 px-6 py-4 shadow-[0_2px_20px_rgba(236,72,153,0.06)] backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300">Página</p>
              <p className="mt-1 font-serif text-2xl font-light italic text-gray-800">{pagination.pageIndex + 1}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={response?.data || []}
          isLoading={isLoading}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={Math.ceil((response?.total || 0) / pagination.pageSize)}
          onRowClick={handleRowClick}
        />
      </motion.div>
    </div>
  );
}
