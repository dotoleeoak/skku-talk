'use client'

import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import MdiAccount from '~icons/mdi/account'
import MdiChat from '~icons/mdi/chat'

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="flex-none rounded-b-xl border-t bg-slate-50 px-20 py-2">
      <ul className="flex items-center justify-between">
        <li>
          <a
            href="/"
            className={clsx(
              pathname == '/'
                ? 'text-slate-800'
                : 'text-slate-400 hover:text-slate-400/80 active:text-slate-400/60',
              'flex flex-col items-center'
            )}
          >
            <MdiAccount className="h-8 text-2xl" />
            <div className="text-xs">친구</div>
          </a>
        </li>
        <li>
          <a
            href="/chat"
            className={clsx(
              pathname == '/chat'
                ? 'text-slate-800'
                : 'text-slate-400 hover:text-slate-400/80 active:text-slate-400/60',
              'flex flex-col items-center'
            )}
          >
            <MdiChat className="h-8 text-xl" />
            <div className="text-xs">채팅</div>
          </a>
        </li>
      </ul>
    </nav>
  )
}
