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


export function CreateAuthor() {
  const form = useForm({
    defaultValues: {
      "name": "",
    },
  })

  const { toast } = useToast()

  async function onSubmit(value: any) {
    try {
      const response = await fetch("http://localhost/api/authors", {
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
                        <Input placeholder="山田太郎"  {...field} />
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
                        description: "著者データを作成しました！",
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
