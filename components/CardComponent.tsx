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

type CardComponentProps = {
  title: string;
  description: string;
}

export function CardComponent({title, description}: CardComponentProps) {
  return (
    <Card className="relative w-full max-w-52 min-w-52 md:min-w-80 md:max-w-80 gap-2 pt-0 pb-3">
      <img
        src="/cover.jpg"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader className="gap-0.5 px-3">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      {/*<CardFooter className="px-3">*/}
      {/*  <Button size="sm" className="h-7 w-full text-xs">*/}
      {/*    View Event*/}
      {/*  </Button>*/}
      {/*</CardFooter>*/}
    </Card>
  )
}
