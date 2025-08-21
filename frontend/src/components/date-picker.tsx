import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"


const formatDate = (date: Date | undefined): string => {
  if (!date) return ""

  return format(date, "MMMM dd, yyyy")
}

const isValidDate = (date: Date | undefined): boolean => {
  if (!date) return false
  return !isNaN(date.getTime())
}

interface DatePickerProps {
  className?: string
  value?: Date
  onChange: (date?: Date) => void
  onBlur?: () => void
  name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.Ref<any>
}

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  value,
  onChange,
  onBlur,
  name,
  ref,
}): React.ReactElement => {

  const parsedDate = value ? new Date(value) : undefined

  const [open, setOpen] = useState<boolean>(false)
  const [month, setMonth] = useState<Date | undefined>(parsedDate)
  const [inputValue, setInputValue] = useState<string>(formatDate(parsedDate))

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id={name}
          ref={ref}
          value={inputValue}
          className={`bg-background pr-10 ${className}`}
          onBlur={onBlur}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value
            const parsedDate = new Date(raw)
            setInputValue(raw)
            if (isValidDate(parsedDate)) {
              onChange(parsedDate)   // 🔥 call RHF onChange with a Date
              setMonth(parsedDate)
            }
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2 cursor-pointer"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={parsedDate}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate: Date | undefined) => {
                onChange(selectedDate)  // 🔥 sync back to RHF
                setInputValue(formatDate(selectedDate))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}


export { DatePicker }
