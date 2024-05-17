'use client'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { getToken } from '@/lib/getCookieCSR'
import { useEffect, useState } from 'react'

export function DeleteAuthor(obj: { id: number }) {
  const [token, setToken] = useState<string | null>(null)
  //クライアントサイドでのみ実行されるようにuseEffectフック内にラップ
  useEffect(() => {
    const token = getToken()
    setToken(token)
  }, [])

  const { toast } = useToast()

  async function handleDelete() {
    try {
      const response = await fetch(`http://localhost/api/admin/authors/${obj.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete author')
      }
      console.log('Author deleted successfully')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Button
      variant="outline"
      className="bg-red-600 hover:bg-red-800"
      onClick={() => {
        toast({
          variant: 'destructive',
          title: '著者データの削除',
          description: '本当にこの著者データを削除しますか？ この著者の関連図書も削除されます。',
          action: (
            <ToastAction altText="Yes" onClick={() => handleDelete()}>
              Yes
            </ToastAction>
          )
        })
      }}
    >
      削除
    </Button>
  )
}
