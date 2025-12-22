import Wrapper from "@/components/layout/Wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip } from "lucide-react";

export default function Upload() {
  return (
    <main>
      <Wrapper className="max-w-7xl grid md:grid-cols-2 gap-x-6 mt-5 md:mt-20">
        <div className="space-y-4">
          <h1 className="font-bold text-2xl">Upload item</h1>
          <Label htmlFor="title">Title</Label>
          <Textarea id="title" className="resize-none h-12" />
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" className="h-32 resize-none" />

          <Input
            id="file"
            type="file"
            className="hover:cursor-pointer hidden"
            accept="image/*"
          />
          <label htmlFor="file" className="hover:cursor-pointer flex gap-x-4">
            Upload Image
            <Paperclip />
          </label>
          <Button>Upload Item</Button>
        </div>
      </Wrapper>
    </main>
  );
}
