export default function TopBarEditor() {
  return (
    <div className="flex h-12 w-full items-center gap-2 bg-muted/40 px-4 z-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/cover.jpg" alt="cover" className="size-8 rounded-md" />
      <span className="text-sm font-medium">Song Name</span>
    </div>
  )
}
