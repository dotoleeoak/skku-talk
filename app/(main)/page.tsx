import ProfileImage from '@/components/ProfileImage'
import MdiAccountPlusOutline from '~icons/mdi/account-plus-outline'
import MdiCogOutline from '~icons/mdi/cog-outline'

export default function Friends() {
  const arr = []
  for (let i = 0; i < 40; i++) {
    arr.push({
      id: i,
      name: `김율전 ${i}`,
      img: 'https://picsum.photos/id/64/64/64'
    })
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full items-center justify-between rounded-t-xl bg-white/50 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">친구</h1>
        <div className="flex gap-3">
          <button className="text-2xl text-gray-700 hover:text-gray-700/80 active:text-gray-700/60">
            <MdiAccountPlusOutline />
          </button>
          <button className="text-2xl text-gray-700 hover:text-gray-700/80 active:text-gray-700/60">
            <MdiCogOutline />
          </button>
        </div>
      </header>
      <section className="flex items-center gap-4 border-b p-4 text-gray-800">
        <ProfileImage
          className="h-16"
          src="https://picsum.photos/id/64/64/64"
        />
        <div>최재민</div>
      </section>
      <h2 className="p-2 text-xs text-gray-500">친구 00명</h2>
      <ul>
        {arr.map((item) => (
          <li
            className="flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-50 active:bg-gray-100"
            key={item.id}
          >
            <ProfileImage className="h-12" src={item.img} />
            <div>{item.name}</div>
          </li>
        ))}
      </ul>
    </>
  )
}
