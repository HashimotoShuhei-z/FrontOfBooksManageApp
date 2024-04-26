'use client'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export function DeleteBook(obj: { id: number }) {
  const { toast } = useToast()

  async function handleDelete() {
    try {
      const response = await fetch(`http://localhost/api/books/${obj.id}`, {
        method: 'POST'
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
