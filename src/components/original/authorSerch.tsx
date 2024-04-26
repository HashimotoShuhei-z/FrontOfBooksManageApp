'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { CreateAuthor } from './createAuthor'

export default function AuthorSearch({ placeholder }: { placeholder: string }) {
  const AuthorSearchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  //useSearchParams- 現在の URL のパラメータにアクセスする。?以降の部分をオブジェクトの形にまとめて返す
  //useRouter = クライアント コンポーネント内のルート間のナビゲーションをプログラムで有効にする

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(AuthorSearchParams) //初期値としてオブジェクトが渡される
    params.set('page', '1') //検索を始めるとpage=1にリセットされる
    if (term) {
      params.set('name', term)
    } else {
      params.delete('name')
    }
    replace(`${pathname}?${params.toString()}`)
    //pathname = 現在のパスを読み込む
    //params.toString()　= 検索バーに入力すると入力がURLに適した形式に変換される
    //replace = URLを更新する
  }, 1000)
  //ユーザーが入力をやめてから1000ms経過した際にコードが実行されるs

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      {' '}
      {/* relative flex flex-1 flex-shrink-0 */}
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-1/2 rounded-md border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ml-80 mt-10"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={AuthorSearchParams.get('name')?.toString()}
      />
      <div className="pt-10 ml-4">
        <CreateAuthor />
      </div>
    </div>
  )
}
