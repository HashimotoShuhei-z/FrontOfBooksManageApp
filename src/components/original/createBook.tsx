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
import { SelectAuthor } from "./selectAuthor";
import { useToast } from "../ui/use-toast";

export function CreateBook() {
  const form = useForm({
    defaultValues: {
      "title": "",
      "author_id": ""
    },
  })

  const { toast } = useToast()

 
  async function onSubmit(value: any) {
    try {
      const response = await fetch("http://localhost/api/books", {
        method: "POST",
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
        <Button variant="outline">本を作成</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>図書データを作成</SheetTitle>
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
                        <Input placeholder=""  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
{/*                 <SelectAuthor />
 */}                <FormField
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
                        description: "図書データを作成しました！",
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
