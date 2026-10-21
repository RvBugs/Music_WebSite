import { FieldLegend, FieldSet ,FieldDescription, FieldGroup ,FieldLabel , Field} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";

export default function NewSongPage() {

  const items = [
    { label: "4/4", value: "4/4" },
    { label: "3/4", value: "3/4" },
    { label: "6/8", value: "6/8" },
    { label: "7/8", value: "7/8" },
  ]

  return (
    <div className="px-4 py-4 lg:px-16">
      <FieldSet>
        <FieldLegend>New Song</FieldLegend>
        <FieldDescription>Create new song to add chords</FieldDescription>
        <FieldGroup>
          <Field className="flex flex-col gap-1">
            <FieldLabel htmlFor="songs">Song Name</FieldLabel>
            <Input
              id="songs"
              autoComplete="off"
              placeholder="e.g. Paper crown"
              aria-label="song name"
            />
            <FieldDescription>Name of the song</FieldDescription>
          </Field>
          <Field className="flex flex-col gap-1">
            <FieldLabel htmlFor="songs">Time signature</FieldLabel>
            <Select items={items}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="e.g. 4/4" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>Time signature of the song</FieldDescription>
          </Field>
          <Field className="flex flex-col gap-1">
            <FieldLabel htmlFor="songs">Scale</FieldLabel>
            <Input
              id="songs"
              autoComplete="off"
              placeholder="e.g. Cm"
              aria-label="song name"
            />
            <FieldDescription>Scale of the song</FieldDescription>
          </Field>
          <div className="w-full flex flex-row gap-2">
            <Button variant="outline" className="w-1/3">Close</Button>
            <Button type="button" className="w-2/3">
              Create New Song
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}