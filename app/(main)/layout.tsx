import NavBar from './NavBar'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex h-full w-[24rem] flex-col rounded-xl border">
      <main className="flex-1">{children}</main>
      <NavBar />
    </div>
  )
}
