export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'hero-outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-yellow text-brand-navy hover:bg-[#FFB300] hover:-translate-y-0.5 shadow-md shadow-brand-yellow/30 hover:shadow-lg hover:shadow-brand-yellow/40',
  secondary:
    'bg-brand-navy text-white hover:bg-[#0a3a8a] hover:-translate-y-0.5 shadow-md shadow-brand-navy/20 hover:shadow-lg hover:shadow-brand-navy/30 dark:bg-brand-blue dark:hover:bg-brand-dark-blue',
  outline:
    'border-2 border-brand-navy text-brand-navy bg-transparent hover:bg-brand-navy hover:text-white dark:border-brand-light-border dark:text-brand-off-white dark:hover:bg-white/10 dark:hover:text-white',
  ghost:
    'text-brand-navy bg-transparent hover:bg-brand-navy/[0.06] dark:text-brand-off-white dark:hover:bg-white/10',
  'hero-outline':
    'border-2 border-white/30 text-white bg-transparent hover:border-white hover:bg-white/[0.08]',
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[13px] rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-[14px] rounded-xl gap-2',
  lg: 'px-8 py-4 text-[16px] rounded-2xl gap-2.5',
}

const buttonBaseClasses =
  'inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50'

export function getButtonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  return [buttonBaseClasses, buttonVariantClasses[variant], buttonSizeClasses[size], className]
    .filter(Boolean)
    .join(' ')
}
