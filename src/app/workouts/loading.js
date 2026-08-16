export default function Loading() {
  return (
    <div className="space-y-5">
      <div>
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />

        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
