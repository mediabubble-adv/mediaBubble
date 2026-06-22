/**
 * MEDIABUBBLE DESIGN TOKENS & SPACING RULES
 *
 * This file centralizes all design decisions to ensure consistency
 * across the Advanced Prompt Generator and future MediaBubble products.
 */

// ============================================================================
// SPACING SCALE (Based on Tailwind default)
// ============================================================================

export const SPACING = {
  // Micro spacing (tight UI elements, icon-to-text)
  xs: '0.5rem', // 8px

  // Small spacing (input padding, small gaps)
  sm: '0.75rem', // 12px

  // Medium spacing (card internal padding, section dividers)
  md: '1rem', // 16px

  // Large spacing (card-to-card, main section padding)
  lg: '1.5rem', // 24px

  // XL spacing (section-to-section, outer panel margins)
  xl: '2rem', // 32px

  // 2XL spacing (major layout divisions)
  '2xl': '3rem', // 48px
};

// Tailwind class mappings
export const SPACING_CLASSES = {
  xs: 'p-2 gap-2',
  sm: 'p-3 gap-3',
  md: 'p-4 gap-4',
  lg: 'p-6 gap-6',
  xl: 'p-8 gap-8',
  '2xl': 'space-y-12 gap-12',
};

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================

export const TYPOGRAPHY = {
  // Page title / Main heading
  h1: {
    className: 'text-3xl font-semibold',
    size: '1.875rem',
    weight: 600,
    lineHeight: 1.2,
  },

  // Section headers
  h2: {
    className: 'text-2xl font-semibold',
    size: '1.5rem',
    weight: 600,
    lineHeight: 1.3,
  },

  // Subsection / Card titles
  h3: {
    className: 'text-lg font-semibold',
    size: '1.125rem',
    weight: 600,
    lineHeight: 1.4,
  },

  // Labels & form headings
  label: {
    className: 'text-sm font-medium',
    size: '0.875rem',
    weight: 500,
    lineHeight: 1.4,
  },

  // Body text
  body: {
    className: 'text-sm',
    size: '0.875rem',
    weight: 400,
    lineHeight: 1.5,
  },

  // Secondary/muted text
  secondary: {
    className: 'text-sm text-muted-foreground',
    size: '0.875rem',
    weight: 400,
    lineHeight: 1.5,
  },

  // Small/meta text
  small: {
    className: 'text-xs',
    size: '0.75rem',
    weight: 400,
    lineHeight: 1.5,
  },

  // Small muted
  smallMuted: {
    className: 'text-xs text-muted-foreground',
    size: '0.75rem',
    weight: 400,
    lineHeight: 1.5,
  },
};

// ============================================================================
// COLOR PALETTE
// ============================================================================

// Light Mode
export const COLORS_LIGHT = {
  background: '#ffffff',
  foreground: '#0f0f0f',
  card: '#fafafa',
  muted: '#f3f4f6',
  'muted-foreground': '#6b7280',
  border: '#e5e7eb',
  accent: '#f9fafb',

  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Brand
  primary: '#3b82f6', // Blue
  secondary: '#8b5cf6', // Purple
};

// Dark Mode
export const COLORS_DARK = {
  background: '#0f0f0f',
  foreground: '#f5f5f5',
  card: '#1a1a1a',
  muted: '#2a2a2a',
  'muted-foreground': '#a0a0a0',
  border: '#333333',
  accent: '#1e1e1e',

  // Status colors (adjusted for dark mode)
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#60a5fa', // Lighter blue for dark mode

  // Brand
  primary: '#3b82f6',
  secondary: '#a78bfa',
};

// ============================================================================
// BORDERS & DEPTH
// ============================================================================

export const BORDERS = {
  // Dividers
  divider: 'border-b border-border',
  'divider-subtle': 'border-b border-border/50',

  // Card borders
  card: 'border border-border',
  'card-subtle': 'border border-border/50',

  // Focus rings (accessibility)
  focus: 'ring-2 ring-blue-500/50 ring-offset-1',
  'focus-visible': 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2',
};

export const SHADOWS = {
  none: 'shadow-none',
  sm: 'shadow-sm', // 0 1px 2px 0 rgba(0,0,0,0.05)
  md: 'shadow-md', // 0 4px 6px -1px rgba(0,0,0,0.1)
  lg: 'shadow-lg', // 0 10px 15px -3px rgba(0,0,0,0.1)
};

export const BORDER_RADIUS = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

// ============================================================================
// INTERACTIVE STATES
// ============================================================================

export const INTERACTIVE_STATES = {
  // Button states
  buttonHover: 'hover:bg-blue-700 active:scale-95',
  buttonFocus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2',
  buttonDisabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',

  // Input states
  inputBase: 'border border-border rounded-md text-foreground placeholder-muted-foreground',
  inputFocus: 'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent',
  inputHover: 'hover:border-border/80',

  // Card states
  cardHover: 'hover:shadow-md hover:border-border/80 transition-all duration-200',
  cardActive: 'bg-accent',

  // Link/chip states
  chipHover: 'hover:shadow-md hover:scale-105',
};

// ============================================================================
// ANIMATION & TRANSITIONS
// ============================================================================

export const ANIMATIONS = {
  // Durations
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',

  // Easing
  easeInOut: 'ease-in-out',
  easeOut: 'ease-out',
  easeIn: 'ease-in',

  // Common transitions
  transition: 'transition-all',
  transitionColors: 'transition-colors',
  transitionOpacity: 'transition-opacity',

  // Loading spinner
  spin: 'animate-spin',

  // Fade & slide
  fadeIn: 'animate-in fade-in',
  slideUp: 'animate-in slide-in-from-bottom-2',
  slideDown: 'animate-in slide-in-from-top-2',
  slideLeft: 'animate-in slide-in-from-left-2',
};

// ============================================================================
// COMPONENT SIZES
// ============================================================================

export const SIZES = {
  // Button sizes
  button: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-base',
  },

  // Input sizes
  input: {
    sm: 'px-3 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  },

  // Icon sizes
  icon: {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  },
};

// ============================================================================
// LAYOUT RATIOS (3-Pane Layout)
// ============================================================================

export const LAYOUT = {
  // Desktop (1440px+)
  desktop: {
    leftPane: 'w-1/4 col-span-3',
    centerPane: 'flex-1 col-span-6',
    rightPane: 'w-1/4 col-span-3',
    gridCols: 'grid-cols-12',
  },

  // Tablet (768px - 1024px)
  tablet: {
    leftPane: 'w-2/5 col-span-5',
    centerPane: 'flex-1 col-span-7',
    rightPane: 'hidden', // Drawer overlay instead
  },

  // Mobile (< 768px)
  mobile: {
    tabs: 'grid-cols-3',
  },
};

// ============================================================================
// PROMPT CHIP CATEGORIES
// ============================================================================

export const CHIP_CATEGORIES = {
  subject: {
    icon: '📝',
    label: 'Subject',
    lightClass: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200',
  },
  camera: {
    icon: '📷',
    label: 'Camera Specs',
    lightClass: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200',
  },
  lighting: {
    icon: '💡',
    label: 'Lighting',
    lightClass: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
  },
  brand: {
    icon: '🎨',
    label: 'Brand DNA',
    lightClass: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200',
  },
  safezones: {
    icon: '🛡️',
    label: 'Safe Zones',
    lightClass: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800 text-green-900 dark:text-green-200',
  },
  mood: {
    icon: '✨',
    label: 'Mood',
    lightClass: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-800 text-pink-900 dark:text-pink-200',
  },
};

// ============================================================================
// PROMPT STRENGTH SCORE COLORS
// ============================================================================

export const SCORE_COLORS = {
  // Score 0-40: Warning (Amber)
  critical: '#f59e0b',
  // Score 40-75: Info (Blue)
  moderate: '#3b82f6',
  // Score 75-100: Success (Green)
  excellent: '#10b981',
};

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

export const KEYBOARD_SHORTCUTS = [
  {
    keys: 'Cmd/Ctrl + Enter',
    action: 'Generate Prompt',
    context: 'Anywhere in settings',
  },
  {
    keys: 'Cmd/Ctrl + C',
    action: 'Copy Prompt',
    context: 'Output panel focused',
  },
  {
    keys: 'Cmd/Ctrl + S',
    action: 'Save as Preset',
    context: 'Output panel',
  },
  {
    keys: 'Cmd/Ctrl + K',
    action: 'Search Presets',
    context: 'Global',
  },
  {
    keys: 'Cmd/Ctrl + ?',
    action: 'Show Help',
    context: 'Global',
  },
  {
    keys: 'Tab',
    action: 'Focus Next Element',
    context: 'Navigation',
  },
  {
    keys: 'Shift + Tab',
    action: 'Focus Previous Element',
    context: 'Navigation',
  },
  {
    keys: 'Escape',
    action: 'Close Modal/Popover',
    context: 'Modal/Popover active',
  },
];

// ============================================================================
// ACCESSIBILITY TARGETS (WCAG 2.1 AA)
// ============================================================================

export const ACCESSIBILITY = {
  // Contrast ratios
  contrastPrimary: '9:1', // Headings on background
  contrastSecondary: '4.5:1', // Body text on background
  contrastMuted: '4.5:1', // Muted text

  // Touch targets (minimum 44x44px)
  touchTargetMin: '44px',

  // Focus indicator
  focusOutlineWidth: '2px',
  focusOutlineStyle: 'solid',

  // Readable font sizes
  minFontSize: '12px',
};

// ============================================================================
// EXPORT COMBINED UTILITIES
// ============================================================================

export const DESIGN_SYSTEM = {
  SPACING,
  SPACING_CLASSES,
  TYPOGRAPHY,
  COLORS_LIGHT,
  COLORS_DARK,
  BORDERS,
  SHADOWS,
  BORDER_RADIUS,
  INTERACTIVE_STATES,
  ANIMATIONS,
  SIZES,
  LAYOUT,
  CHIP_CATEGORIES,
  SCORE_COLORS,
  KEYBOARD_SHORTCUTS,
  ACCESSIBILITY,
};

export default DESIGN_SYSTEM;
