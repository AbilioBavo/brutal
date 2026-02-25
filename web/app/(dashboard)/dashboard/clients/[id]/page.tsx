'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import apiClient from '@/lib/api-client';
import type { FindOneClientModelSchema } from '@/src/gen/models/FindOneClientModelSchema';
import { motion } from 'framer-motion';

export default function ClientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  const { data: client, isLoading, error } = useQuery({
    queryKey: ['client', clientId],
    queryFn: async () => {
      const response = await apiClient.get<{ data: FindOneClientModelSchema }>(
        `/api/clients/${clientId}`
      );
      return response.data.data;
    },
    enabled: !!clientId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-pink-100 border-t-pink-500" />
          <p className="font-serif text-sm font-light italic text-gray-400">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="rounded-xl border-pink-100 text-gray-500 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voltar
        </Button>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-[0_4px_40px_rgba(239,68,68,0.08)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <svg className="h-7 w-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
            <p className="font-serif text-lg font-light italic text-red-800">
              Cliente não encontrado
            </p>
            <p className="mt-2 text-sm text-red-500">
              {error instanceof Error ? error.message : 'O cliente solicitado não existe'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatBirthDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Data inválida';
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

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

  const hasBestieInfo = client.bestieFirstName || client.bestieLastName || client.bestiePhone;

  const InfoItem = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300">{label}</p>
      <p className={`mt-1 text-gray-800 ${mono ? 'font-mono text-sm' : ''}`}>{value}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-5 rounded-xl border-pink-100 text-gray-500 transition-all hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Voltar
          </Button>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-pink-400">
            Detalhes
          </p>
          <h1 className="bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 bg-clip-text font-serif text-4xl font-light italic tracking-wide text-transparent">
            {client.firstName} {client.lastName}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-px w-10 bg-linear-to-r from-pink-300 to-transparent" />
            <p className="text-sm font-light text-gray-500">
              Informações completas do registro
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group relative overflow-hidden rounded-3xl border border-pink-100/60 bg-white/80 p-8 shadow-[0_4px_40px_rgba(236,72,153,0.06)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_8px_60px_rgba(236,72,153,0.1)]"
        >
          {/* Top accent */}
          <div className="absolute left-1/2 top-0 h-1 w-0 -translate-x-1/2 rounded-b-full bg-linear-to-r from-pink-400 to-rose-400 transition-all duration-500 group-hover:w-20" />

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50">
              <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-lg font-light italic text-gray-800">Informações Pessoais</h2>
              <p className="text-xs text-gray-400">Dados cadastrais do cliente</p>
            </div>
          </div>

          <div className="space-y-5">
            <InfoItem label="Nome Completo" value={`${client.firstName} ${client.lastName}`} />
            <div className="h-px bg-linear-to-r from-pink-100/60 to-transparent" />
            <InfoItem label="Email" value={client.email} />
            <div className="h-px bg-linear-to-r from-pink-100/60 to-transparent" />
            <InfoItem label="Telefone" value={client.phone} />
            <div className="h-px bg-linear-to-r from-pink-100/60 to-transparent" />
            <InfoItem label="Data de Nascimento" value={formatBirthDate(client.birthDate)} />
            <div className="h-px bg-linear-to-r from-pink-100/60 to-transparent" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300">Idade</p>
              <div className="mt-2">
                <Badge className="rounded-lg border-pink-100 bg-pink-50 px-3 py-1 font-serif text-base font-light italic text-pink-600 hover:bg-pink-100">
                  {calculateAge(client.birthDate)} anos
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bestie Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group relative overflow-hidden rounded-3xl border border-pink-100/60 bg-white/80 p-8 shadow-[0_4px_40px_rgba(236,72,153,0.06)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_8px_60px_rgba(236,72,153,0.1)]"
        >
          {/* Top accent */}
          <div className="absolute left-1/2 top-0 h-1 w-0 -translate-x-1/2 rounded-b-full bg-linear-to-r from-pink-400 to-rose-400 transition-all duration-500 group-hover:w-20" />

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50">
              <svg className="h-5 w-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-lg font-light italic text-gray-800">Informações do Bestie</h2>
              <p className="text-xs text-gray-400">Dados do acompanhante cadastrado</p>
            </div>
          </div>

          {hasBestieInfo ? (
            <div className="space-y-5">
              {(client.bestieFirstName || client.bestieLastName) && (
                <InfoItem label="Nome do Bestie" value={`${client.bestieFirstName || ''} ${client.bestieLastName || ''}`} />
              )}
              {client.bestiePhone && (
                <>
                  <div className="h-px bg-linear-to-r from-pink-100/60 to-transparent" />
                  <InfoItem label="Telefone do Bestie" value={client.bestiePhone} />
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50/60">
                <svg className="h-7 w-7 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <p className="font-serif text-sm font-light italic text-gray-400">
                Nenhuma informação de bestie cadastrada
              </p>
            </div>
          )}
        </motion.div>

        {/* System Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group relative overflow-hidden rounded-3xl border border-pink-100/60 bg-white/80 p-8 shadow-[0_4px_40px_rgba(236,72,153,0.06)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_8px_60px_rgba(236,72,153,0.1)] md:col-span-2"
        >
          <div className="absolute left-1/2 top-0 h-1 w-0 -translate-x-1/2 rounded-b-full bg-linear-to-r from-pink-400 to-rose-400 transition-all duration-500 group-hover:w-20" />

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50">
              <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-lg font-light italic text-gray-800">Informações do Sistema</h2>
              <p className="text-xs text-gray-400">Datas e identificadores do registro</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <InfoItem label="ID do Registro" value={client.id} mono />
            <InfoItem label="Data de Cadastro" value={formatDate(client.createdAt)} />
            <InfoItem label="Última Atualização" value={formatDate(client.updatedAt)} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
