export default function ChipList({
  title,
  csv,
  className,
}: {
  title: string
  csv: string | null
  className: string
}) {
  if (!csv) return null
  const items = csv.split(',').map((s) => s.trim()).filter(Boolean)

  return (
    <div className="mt-4">
      <h3 className="font-label-lg text-label-lg text-on-surface">{title}</h3>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className={`rounded-full px-2.5 py-1 font-label-sm text-label-sm ${className}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}