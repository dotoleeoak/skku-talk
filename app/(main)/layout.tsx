import NavBar from './NavBar'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex h-full w-[28rem] flex-col rounded-xl border">
      <main className="flex-1 overflow-y-scroll">{children}</main>
      <NavBar />
    </div>
  )
}
