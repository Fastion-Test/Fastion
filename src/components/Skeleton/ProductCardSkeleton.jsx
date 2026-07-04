export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-brand-gray-100 dark:border-brand-gray-800 overflow-hidden">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="p-3.5 flex flex-col gap-2">
        <div className="skeleton h-2.5 w-1/3 rounded" />
        <div className="skeleton h-3.5 w-4/5 rounded" />
        <div className="skeleton h-3.5 w-1/2 rounded" />
        <div className="skeleton h-8 w-full rounded-full mt-2" />
      </div>
    </div>
  );
}
