'use client'
import { Button } from '@/components/parts/button'
import { Input } from '@/components/parts/input'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/partsGroups/sheet'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form'
import { useForm } from 'react-hook-form'
import { useToast } from '../use-toast'
import { useEffect, useState } from 'react'
import { getToken } from '@/lib/getCookieCSR'

export function CreateAuthor() {
  const [token, setToken] = useState<string | null>(null)
  //クライアントサイドでのみ実行されるようにuseEffectフック内にラップ
  useEffect(() => {
    const token = getToken()
    setToken(token)
  }, [])

  const form = useForm({
    defaultValues: {
      name: ''
    }
  })
  const { toast } = useToast()

  async function onSubmit(value: any) {
    try {
      const response = await fetch('http://localhost/api/admin/authors', {
        method: 'POST',
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
        <Button variant="outline">著者を作成</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>著者データを作成</SheetTitle>
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
                      <Input placeholder="山田太郎" {...field} />
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
                      description: '著者データを作成しました！'
                    })
                  }}
                >
                  作成
                </Button>
              </SheetClose>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
