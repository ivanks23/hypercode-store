export default function LoadingProductsPage() {
  return (
    <main className="container mx-auto p-8">
      <div className="h-10 w-full bg-gray-200 rounded animate-pulse mb-8" />

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-6 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-xl p-4"
              >
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />

                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />

                  <div className="h-6 bg-gray-200 rounded animate-pulse" />

                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
