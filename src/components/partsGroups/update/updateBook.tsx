'use client'
import { Button } from '@/components/parts/button'
import { Input } from '@/components/parts/input'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/partsGroups/sheet'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../partsGroups/form'
import { useForm } from 'react-hook-form'
import { useToast } from '../ui/use-toast'
import { useEffect, useState } from 'react'
import { getToken } from '@/lib/getCookieCSR'

export function UpdateBook(obj: { id: number; title: string; author_id: number }) {
  const [token, setToken] = useState<string | null>(null)
  //クライアントサイドでのみ実行されるようにuseEffectフック内にラップ
  useEffect(() => {
    const token = getToken()
    setToken(token)
  }, [])

  const form = useForm({
    defaultValues: {
      title: obj.title,
      author_id: obj.author_id
    }
  })

  const { toast } = useToast()

  async function onSubmit(value: any) {
    try {
      const response = await fetch(`http://localhost/api/admin/books/${obj.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(value)
      })

      if (!response.ok) {
        throw new Error('Failed to create author')
      }
      console.log('Author created successfully')
    } catch (error) {
      console.error('Error:', error)
    }
    console.log(value)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-green-500 hover:bg-green-800">
          編集
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{obj.title} の図書データを編集する</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タイトル:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>著者id:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetClose asChild>
                <Button
                  type="submit"
                  onClick={() => {
                    toast({
                      description: '図書データを更新しました！'
                    })
                  }}
                >
                  更新
                </Button>
              </SheetClose>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
