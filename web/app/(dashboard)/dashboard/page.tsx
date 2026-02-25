
import { redirect,  } from 'next/navigation';

export default function DashboardPage() {
  redirect("/dashboard/clients")


  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-pink-600" />
        <p className="text-sm text-gray-600">Redirecionando...</p>
      </div>
    </div>
  );
}
