import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "./ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"
import { useState } from "react"

export default function AddSection({
  open,
  onOpenChange,
  setNewSection,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  setNewSection: (section: { name: string, description: string }) => void
}) {

  const [name ,setName] = useState<string>("")
  const [description ,setDescription] = useState<string>("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger></DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add section</DialogTitle>
          <DialogDescription>
            Give the section a name, like Intro or Verse.
          </DialogDescription>
        </DialogHeader>
        <div>
          <FieldSet>
            <FieldGroup className="flex flex-col gap-4">
              <Field className="flex flex-col gap-1">
                <FieldLabel htmlFor="name">Section Name</FieldLabel>
                <Input
                  id="name"
                  autoComplete="off"
                  placeholder="e.g. Song Intro"
                  aria-label="Section Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <FieldDescription>
                  Add new section to the song, name for that section, e.g. Intro
                </FieldDescription>
              </Field>
              <Field className="flex flex-col gap-1">
                <FieldLabel htmlFor="name">Section Description</FieldLabel>
                <Textarea
                  id="name"
                  autoComplete="off"
                  placeholder="e.g. This is the intro of the song"
                  aria-label="Section Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <FieldDescription>
                  New section description, e.g. Intro to the song
                </FieldDescription>
              </Field>
            </FieldGroup>
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="w-1/3" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button variant="default" className="w-2/3" onClick={() => {
                setNewSection({ name, description })
                onOpenChange(false)
              }}>
                <Plus className="mr-2 size-4" />
                Add Section
              </Button>
            </div>
          </FieldSet>
        </div>
      </DialogContent>
    </Dialog>
  )
}
