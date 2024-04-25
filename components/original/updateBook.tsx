"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { useToast } from "../ui/use-toast";

export function UpdateBook(obj: {id: number ,title: string ,author_id: number}) {
  const form = useForm({
    defaultValues: {
      "title": obj.title,
      "author_id": obj.author_id
    },
  })

  const { toast } = useToast()

  async function onSubmit(value: any) {
    try {
      const response = await fetch(`http://localhost/api/books/${obj.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value), // dataを直接JSONに変換
      });

      if (!response.ok) {
        throw new Error('Failed to create author');
      }
      console.log('Author created successfully');

    } catch (error) {
      console.error('Error:', error);
    }
    console.log(value);
    
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-green-500 hover:bg-green-800">編集</Button>
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
                        <Input  {...field} />
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
                        <Input  {...field} />
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
                        description: "図書データを更新しました！",
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
