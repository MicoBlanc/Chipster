import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DemoFruit from "./demo/demoFruit"
import DemoEmailShare from "./demo/demoEmailShare"
import DemoContentTags from "./demo/demoContentTags"


export default function DemoContainer() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Chipster in Action</h2>
      <Tabs defaultValue="fruit" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fruit">Fruit Picker</TabsTrigger>
          <TabsTrigger value="email">Email Share</TabsTrigger>
          <TabsTrigger value="tags">Content Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="fruit">
          <DemoFruit />
        </TabsContent>
        <TabsContent value="email">
          <DemoEmailShare />
        </TabsContent>
        <TabsContent value="tags">
          <DemoContentTags />
        </TabsContent>
      </Tabs>
    </div>
  )
}