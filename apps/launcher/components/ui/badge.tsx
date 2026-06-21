import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Brand tones map directly to the Obsidian palette — tinted surfaces with
// matching text rather than heavy fills. The `variant` prop uses shadcn
// convention; the `tone` alias adds the semantic brand vocabulary.
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/15 text-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive/15 text-destructive",
        outline:
          "border-border text-foreground",
        // Brand semantic tones
        neutral:
          "border-transparent bg-muted text-muted-foreground",
        blue:
          "border-transparent bg-primary/15 text-primary",
        success:
          "border-transparent bg-[#16A34A]/15 text-[#16A34A]",
        warning:
          "border-transparent bg-[#CA8A04]/15 text-[#CA8A04]",
        danger:
          "border-transparent bg-destructive/15 text-destructive",
        accent:
          "border-transparent bg-accent/20 text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// `tone` is an alias for `variant` — keeps semantic caller code readable
// while staying fully compatible with shadcn's `variant` convention.
type Tone = 'neutral' | 'blue' | 'success' | 'warning' | 'danger' | 'accent'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  tone?: Tone
}

function Badge({ className, variant, tone, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant: (tone ?? variant) as any }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
