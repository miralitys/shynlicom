"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type AccordionValue = string | string[] | undefined

type AccordionContextValue = {
  value: AccordionValue
  type?: "single" | "multiple"
  collapsible?: boolean
  setItemValue: (itemValue: string) => void
}

type AccordionItemContextValue = {
  value: string
  open: boolean
  toggle: () => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: AccordionValue
  value?: AccordionValue
  onValueChange?: (value: AccordionValue) => void
}

function Accordion({
  className,
  type = "single",
  collapsible = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  ...props
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<AccordionValue>(
    defaultValue ?? (type === "multiple" ? [] : undefined)
  )
  const value = controlledValue ?? uncontrolledValue

  const setValue = React.useCallback(
    (nextValue: AccordionValue) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [controlledValue, onValueChange]
  )

  const setItemValue = React.useCallback(
    (itemValue: string) => {
      if (type === "multiple") {
        const currentValue = Array.isArray(value) ? value : []
        const nextValue = currentValue.includes(itemValue)
          ? currentValue.filter((entry) => entry !== itemValue)
          : [...currentValue, itemValue]
        setValue(nextValue)
        return
      }

      const isOpen = value === itemValue
      if (isOpen && collapsible) {
        setValue(undefined)
        return
      }
      setValue(itemValue)
    },
    [collapsible, setValue, type, value]
  )

  const contextValue = React.useMemo(
    () => ({ value, type, collapsible, setItemValue }),
    [collapsible, setItemValue, type, value]
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      <div data-slot="accordion" className={className} {...props} />
    </AccordionContext.Provider>
  )
}

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string
}

function AccordionItem({ className, value, ...props }: AccordionItemProps) {
  const accordion = React.useContext(AccordionContext)
  const open = Array.isArray(accordion?.value)
    ? accordion.value.includes(value)
    : accordion?.value === value

  const itemValue = React.useMemo(
    () => ({
      value,
      open,
      toggle: () => accordion?.setItemValue(value),
    }),
    [accordion, open, value]
  )

  return (
    <AccordionItemContext.Provider value={itemValue}>
      <div
        data-slot="accordion-item"
        data-state={open ? "open" : "closed"}
        className={cn("border-b last:border-b-0", className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: AccordionTriggerProps) {
  const item = React.useContext(AccordionItemContext)

  return (
    <div className="flex">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={item?.open ? "open" : "closed"}
        aria-expanded={item?.open ?? false}
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            item?.toggle()
          }
        }}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
      </button>
    </div>
  )
}

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const item = React.useContext(AccordionItemContext)

  if (!item?.open) {
    return null
  }

  return (
    <div
      data-slot="accordion-content"
      data-state="open"
      className="overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
