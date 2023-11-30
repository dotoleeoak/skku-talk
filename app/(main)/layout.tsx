import NavBar from './NavBar'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto my-2 flex h-[calc(100%-1rem)] w-[24rem] flex-col rounded-xl border">
      <main className="flex-1 overflow-y-scroll">{children}</main>
      <NavBar />
    </div>
  )
}
