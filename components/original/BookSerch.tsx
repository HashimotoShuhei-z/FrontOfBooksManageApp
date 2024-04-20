'use client';
 
//import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
 
export default function BookSearch({ placeholder }: { placeholder: string }) {
    const BookSearchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    //useSearchParams- 現在の URL のパラメータにアクセスする
    //useRouter = クライアント コンポーネント内のルート間のナビゲーションをプログラムで有効にする

    const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(BookSearchParams);
      if (term) {
          params.set('title', term);
        } else {
          params.delete('title');
        }
      replace(`${pathname}?${params.toString()}`);
      //pathname = 現在のパスを読み込む
      //params.toString()　= 検索バーに入力すると入力がURLに適した形式に変換される
      //replace = URLを更新する    
    },1000);
    //ユーザーが入力をやめてから1000ms経過した際にコードが実行されるs
 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-2/3 rounded-md border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 mx-auto mt-10"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={BookSearchParams.get('title')?.toString()}
      />
{/*       <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
 */}    </div>
  );
}