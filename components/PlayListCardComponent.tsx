import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PlayListCardComponent() {
  return (
    <Card className="relative mx-auto w-full max-w-52 min-w-52 gap-2 pt-0 pb-3">
      <img
        src="/cover.jpg"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader className="gap-0.5 px-3">
        <CardTitle className="text-sm">Wedding PlayList</CardTitle>
        <CardDescription className="text-xs">
          playlist for wedding on october 2026
        </CardDescription>
      </CardHeader>
      <CardFooter className="px-3">
        <Button size="sm" className="h-7 w-full text-xs">
          View Event
        </Button>
      </CardFooter>
    </Card>
  )
}
