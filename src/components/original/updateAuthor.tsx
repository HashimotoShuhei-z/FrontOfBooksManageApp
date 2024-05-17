'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { useToast } from '../ui/use-toast'
import { useEffect, useState } from 'react'
import { getToken } from '@/lib/getCookieCSR'

export function UpdateAuthor(obj: { id: number; name: string }) {
  const [token, setToken] = useState<string | null>(null)
  //クライアントサイドでのみ実行されるようにuseEffectフック内にラップ
  useEffect(() => {
    const token = getToken()
    setToken(token)
  }, [])

  const form = useForm({
    defaultValues: {
      name: obj.name
    }
  })

  const { toast } = useToast()

  async function onSubmit(value: any) {
    try {
      const response = await fetch(`http://localhost/api/admin/authors/${obj.id}`, {
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
          <SheetTitle>{obj.name} の著者データを編集</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>著者名:</FormLabel>
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
                      description: '著者データを更新しました！'
                    }) //TODO:入力が間違っていた場合、別のtoastを表示する
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
