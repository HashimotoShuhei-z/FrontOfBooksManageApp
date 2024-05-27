'use client'
import { Button } from '@/components/parts/button'
import { ToastAction } from '@/components/partsGroups/toast'
import { useToast } from '@/components/partsGroups/use-toast'
import { getToken } from '@/lib/getCookieCSR'
import { useEffect, useState } from 'react'

export function DeleteBook(obj: { id: number }) {
  const [token, setToken] = useState<string | null>(null)
  //クライアントサイドでのみ実行されるようにuseEffectフック内にラップ
  useEffect(() => {
    const token = getToken()
    setToken(token)
  }, [])

  const { toast } = useToast()

  async function handleDelete() {
    try {
      const response = await fetch(`http://localhost/api/admin/books/${obj.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete book')
      }
      console.log('Book deleted successfully')
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
          title: '図書データの削除',
          description: '本当にこの図書データを削除しますか？',
          action: (
            <ToastAction altText="Yes" onClick={() => handleDelete()}>
              {' '}
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
