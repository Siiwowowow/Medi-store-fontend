// src/app/seller/dashboard/loading.tsx

export default function SellerDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse p-4">
      <div className="h-32 bg-gray-200 rounded-2xl w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-xl border border-gray-100"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-[400px] bg-gray-50 rounded-xl"></div>
        <div className="lg:col-span-2 h-[400px] bg-gray-50 rounded-xl"></div>
      </div>
    </div>
  );
}