import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { CheckCircle2, Check, Copy, Minus } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
export { default as mbPreset, default as mbTailwindPreset } from './tailwind-preset.esm.js';
import 'tailwindcss/plugin';
import 'tailwindcss/lib/util/escapeClassName';

const buttonVariantClasses = {
  primary: 'bg-brand-yellow text-brand-navy hover:bg-[#FFB300] hover:-translate-y-0.5 shadow-md shadow-brand-yellow/30 hover:shadow-lg hover:shadow-brand-yellow/40',
  secondary: 'bg-brand-navy text-white hover:bg-[#0a3a8a] hover:-translate-y-0.5 shadow-md shadow-brand-navy/20 hover:shadow-lg hover:shadow-brand-navy/30 dark:bg-brand-blue dark:hover:bg-brand-dark-blue',
  outline: 'border-2 border-brand-navy text-brand-navy bg-transparent hover:bg-brand-navy hover:text-white dark:border-brand-light-border dark:text-brand-off-white dark:hover:bg-white/10 dark:hover:text-white',
  ghost: 'text-brand-navy bg-transparent hover:bg-brand-navy/[0.06] dark:text-brand-off-white dark:hover:bg-white/10',
  'hero-outline': 'border-2 border-white/30 text-white bg-transparent hover:border-white hover:bg-white/[0.08]'
};
const buttonSizeClasses = {
  sm: 'px-4 py-2 text-[13px] rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-[14px] rounded-xl gap-2',
  lg: 'px-8 py-4 text-[16px] rounded-2xl gap-2.5'
};
const buttonBaseClasses = 'inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50';
function getButtonClasses(variant = 'primary', size = 'md', className = '') {
  return [buttonBaseClasses, buttonVariantClasses[variant], buttonSizeClasses[size], className].filter(Boolean).join(' ');
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function Button(_a) {
  var {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className = '',
      children
    } = _a,
    rest = __rest(_a, ["variant", "size", "loading", "disabled", "className", "children"]);
  return /*#__PURE__*/jsxs("button", {
    "data-ripple": "",
    disabled: disabled || loading,
    className: ['inline-flex items-center justify-center font-semibold whitespace-nowrap', 'transition-all duration-150 active:scale-[0.97]', 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50', 'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none', buttonVariantClasses[variant], buttonSizeClasses[size], className].join(' '),
    ...rest,
    children: [loading && /*#__PURE__*/jsxs("svg", {
      className: "animate-spin -ml-0.5 h-4 w-4",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      children: [/*#__PURE__*/jsx("circle", {
        className: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        strokeWidth: "4"
      }), /*#__PURE__*/jsx("path", {
        className: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      })]
    }), children]
  });
}

function Card({
  children,
  hover = false,
  padded = true,
  className = ''
}) {
  return /*#__PURE__*/jsx("div", {
    className: ['rounded-2xl border border-brand-whisper-border bg-brand-surface', 'dark:bg-brand-navy/40 dark:border-brand-light-border', padded ? 'p-6' : '', hover ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-navy/[0.08] hover:border-brand-light-border' : '', className].join(' '),
    children: children
  });
}
function ServiceCard({
  icon,
  title,
  description,
  href,
  className = ''
}) {
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/jsxs(Tag, {
    ...(href ? {
      href
    } : {}),
    className: ['group relative bg-brand-surface rounded-2xl p-6 border border-brand-whisper-border', 'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/[0.08]', 'dark:hover:shadow-brand-navy/20', href ? 'cursor-pointer' : '', className].join(' '),
    children: [/*#__PURE__*/jsx("div", {
      className: "w-12 h-12 flex items-center justify-center rounded-xl bg-brand-navy/[0.06] mb-4 text-brand-navy group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors duration-200",
      children: icon
    }), /*#__PURE__*/jsx("h3", {
      className: "text-[17px] font-semibold text-brand-navy dark:text-brand-off-white mb-2",
      children: title
    }), /*#__PURE__*/jsx("p", {
      className: "text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed",
      children: description
    })]
  });
}
function FeatureCard({
  feature,
  description,
  className = ''
}) {
  return /*#__PURE__*/jsxs("div", {
    className: ['flex gap-3', className].join(' '),
    children: [/*#__PURE__*/jsx(CheckCircle2, {
      size: 20,
      className: "text-brand-yellow mt-0.5 flex-shrink-0"
    }), /*#__PURE__*/jsxs("div", {
      children: [/*#__PURE__*/jsx("p", {
        className: "text-[15px] font-semibold text-brand-navy dark:text-brand-off-white",
        children: feature
      }), description && /*#__PURE__*/jsx("p", {
        className: "text-[13px] text-brand-secondary dark:text-brand-text-muted mt-0.5 leading-relaxed",
        children: description
      })]
    })]
  });
}
function TestimonialCard({
  quote,
  author,
  title,
  company,
  avatarUrl,
  className = ''
}) {
  return /*#__PURE__*/jsxs("div", {
    className: ['bg-brand-surface rounded-2xl p-6 border border-brand-whisper-border', 'shadow-sm hover:shadow-md transition-shadow duration-200', className].join(' '),
    children: [/*#__PURE__*/jsx("div", {
      className: "flex gap-0.5 mb-4",
      "aria-label": "5 out of 5 stars",
      children: Array.from({
        length: 5
      }).map((_, i) => /*#__PURE__*/jsx("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        fill: "#FFC107",
        "aria-hidden": "true",
        children: /*#__PURE__*/jsx("path", {
          d: "M7 1l1.545 4.756H13.5L9.477 8.488l1.545 4.756L7 10.512l-4.023 2.732 1.546-4.756L.5 5.756h4.955z"
        })
      }, i))
    }), /*#__PURE__*/jsxs("blockquote", {
      children: [/*#__PURE__*/jsxs("p", {
        className: "text-[15px] text-brand-secondary dark:text-brand-text-muted leading-relaxed mb-5",
        children: ["\"", quote, "\""]
      }), /*#__PURE__*/jsxs("footer", {
        className: "flex items-center gap-3",
        children: [avatarUrl ? /*#__PURE__*/jsx("img", {
          src: avatarUrl,
          alt: author,
          className: "w-10 h-10 rounded-full object-cover"
        }) : /*#__PURE__*/jsx("div", {
          className: "w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center text-[13px] font-semibold",
          children: author.charAt(0).toUpperCase()
        }), /*#__PURE__*/jsxs("div", {
          children: [/*#__PURE__*/jsx("p", {
            className: "text-[14px] font-semibold text-brand-navy dark:text-brand-off-white",
            children: author
          }), (title || company) && /*#__PURE__*/jsx("p", {
            className: "text-[12px] text-brand-secondary dark:text-brand-text-muted",
            children: [title, company].filter(Boolean).join(', ')
          })]
        })]
      })]
    })]
  });
}
function CaseStudyCard({
  metric,
  metricLabel,
  description,
  company,
  href,
  className = ''
}) {
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/jsxs(Tag, {
    ...(href ? {
      href
    } : {}),
    className: ['group relative bg-brand-navy rounded-2xl p-6 overflow-hidden', 'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/30', href ? 'cursor-pointer' : '', className].join(' '),
    children: [/*#__PURE__*/jsx("div", {
      className: "absolute top-0 right-0 w-48 h-48 bg-brand-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none",
      "aria-hidden": "true"
    }), /*#__PURE__*/jsx("p", {
      className: "text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4",
      children: company
    }), /*#__PURE__*/jsxs("div", {
      className: "mb-4",
      children: [/*#__PURE__*/jsx("span", {
        className: "text-[42px] font-bold text-brand-yellow leading-none",
        children: metric
      }), /*#__PURE__*/jsx("p", {
        className: "text-[13px] font-medium text-white/70 mt-1",
        children: metricLabel
      })]
    }), /*#__PURE__*/jsx("p", {
      className: "text-[14px] text-white/60 leading-relaxed",
      children: description
    }), href && /*#__PURE__*/jsxs("div", {
      className: "mt-4 flex items-center gap-1 text-[13px] font-semibold text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-150",
      children: ["View Case Study", /*#__PURE__*/jsx("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        "aria-hidden": "true",
        children: /*#__PURE__*/jsx("path", {
          d: "M2.5 7h9m-4-4.5L11.5 7l-4 4.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      })]
    })]
  });
}

function Input(_a) {
  var {
      label,
      error,
      hint,
      id,
      className = ''
    } = _a,
    props = __rest(_a, ["label", "error", "hint", "id", "className"]);
  const inputId = id !== null && id !== void 0 ? id : label ? label.toLowerCase().replace(/\s+/g, '-') : undefined;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return /*#__PURE__*/jsxs("div", {
    className: "w-full",
    children: [label && /*#__PURE__*/jsx("label", {
      htmlFor: inputId,
      className: "block text-[13px] font-semibold text-brand-navy dark:text-brand-off-white mb-2",
      children: label
    }), /*#__PURE__*/jsx("input", {
      id: inputId,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy,
      className: ['w-full px-4 py-3 rounded-xl border text-body-md text-brand-charcoal bg-brand-surface', 'dark:bg-brand-navy/50 dark:text-brand-off-white dark:border-brand-light-border', 'outline-none transition-all duration-150 placeholder:text-brand-muted-steel', 'focus-visible:ring-2 focus-visible:ring-brand-blue/25 focus-visible:border-brand-blue', error ? 'border-brand-error focus-visible:ring-brand-error/25 focus-visible:border-brand-error' : 'border-brand-input-border', className].join(' '),
      ...props
    }), error && /*#__PURE__*/jsx("p", {
      id: `${inputId}-error`,
      className: "text-[12px] text-brand-error mt-1.5",
      role: "alert",
      children: error
    }), !error && hint && /*#__PURE__*/jsx("p", {
      id: `${inputId}-hint`,
      className: "text-[12px] text-brand-secondary mt-1.5",
      children: hint
    })]
  });
}

const variantClasses$1 = {
  primary: 'bg-brand-blue/10 text-brand-dark-blue dark:bg-brand-blue/20 dark:text-brand-blue',
  secondary: 'bg-brand-navy/[0.06] text-brand-navy dark:bg-white/10 dark:text-brand-off-white',
  success: 'bg-brand-success-bg text-brand-success',
  warning: 'bg-brand-warning-bg text-brand-warning',
  error: 'bg-brand-error-bg text-brand-error',
  info: 'bg-brand-info-bg text-brand-info'
};
function Badge({
  variant = 'primary',
  children,
  className = ''
}) {
  return /*#__PURE__*/jsx("span", {
    className: ['inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold leading-none', variantClasses$1[variant], className].join(' '),
    children: children
  });
}

function MasterSwatch({
  selectedColor,
  onCopy,
  copiedId,
  onColorSelect
}) {
  const isLight = ['#FFFFFF', '#FAFAFA', '#F5F5F5', '#FFF8E1', '#FFECB3', '#FFE082', '#E3F2FD', '#BBDEFB', '#E8EAF6', '#C5CAE9'].includes(selectedColor);
  const textColor = isLight ? 'text-black/75' : 'text-white';
  const labelColor = isLight ? 'text-black/40' : 'text-white/55';
  const btnBg = isLight ? 'bg-black/8 hover:bg-black/15' : 'bg-white/15 hover:bg-white/25';
  const btnText = isLight ? 'text-black/50' : 'text-white/75';
  return /*#__PURE__*/jsx("div", {
    className: "bg-white rounded-xl border border-[#E8E8E8] shadow-[0_2px_6px_rgba(0,0,0,0.07)] overflow-hidden mb-8",
    children: /*#__PURE__*/jsxs("div", {
      className: "h-56 sm:h-64 relative flex items-center justify-center transition-colors duration-300",
      style: {
        backgroundColor: selectedColor
      },
      children: [/*#__PURE__*/jsx("div", {
        className: "absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"
      }), /*#__PURE__*/jsxs("div", {
        className: "relative text-center",
        children: [/*#__PURE__*/jsx("p", {
          className: `text-[11px] font-semibold uppercase tracking-[0.22em] ${labelColor} mb-3`,
          children: "Preview"
        }), /*#__PURE__*/jsx("p", {
          className: `font-display text-5xl sm:text-7xl font-black ${textColor} tracking-tight`,
          children: selectedColor
        })]
      }), /*#__PURE__*/jsx("button", {
        onClick: () => onCopy(selectedColor, 'master-color'),
        className: `absolute top-4 end-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${btnBg} ${btnText} hover:opacity-100 hover:scale-[1.03] active:scale-95 text-[11px] font-medium transition-all backdrop-blur-sm`,
        children: copiedId === 'master-color' ? /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Check, {
            size: 13,
            className: "text-green-400 animate-pulse-once"
          }), " Copied"]
        }) : /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Copy, {
            size: 13
          }), " Copy"]
        })
      })]
    })
  });
}

function SectionHeader({
  kicker,
  title,
  intro,
  align = 'left',
  light = false,
  className = '',
  id
}) {
  const centred = align === 'center';
  return /*#__PURE__*/jsxs("div", {
    className: ['max-w-2xl', centred ? 'mx-auto text-center' : '', className].join(' '),
    children: [kicker && /*#__PURE__*/jsx("p", {
      className: ['text-[11px] font-bold tracking-[0.12em] uppercase mb-3', light ? 'text-white/50' : 'text-brand-blue dark:text-brand-yellow'].join(' '),
      children: kicker
    }), /*#__PURE__*/jsx("h2", {
      id: id,
      className: ['font-display text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-tight mb-4', light ? 'text-white' : 'text-brand-navy dark:text-brand-off-white'].join(' '),
      children: title
    }), intro && /*#__PURE__*/jsx("p", {
      className: ['text-[16px] sm:text-[17px] leading-relaxed', light ? 'text-white/70' : 'text-brand-secondary dark:text-brand-muted-steel'].join(' '),
      children: intro
    })]
  });
}

const variantClasses = {
  hero: {
    container: 'border-t border-white/20 pt-6',
    value: 'font-display text-[2rem] font-bold text-brand-yellow leading-none mb-1',
    label: 'text-[12px] text-white/50 font-medium uppercase tracking-wide'
  },
  'dark-bar': {
    container: '',
    value: 'font-display font-semibold text-white tabular-nums tracking-tight',
    label: 'text-[13px] sm:text-[14px] text-white/65'
  },
  light: {
    container: '',
    value: 'text-[28px] sm:text-[34px] font-bold text-brand-yellow leading-none',
    label: 'text-[12px] text-brand-secondary dark:text-brand-text-muted mt-1'
  }
};
function MetricStrip({
  items,
  variant = 'hero',
  columns = 3,
  className = '',
  'aria-label': ariaLabel = 'Key metrics'
}) {
  const styles = variantClasses[variant];
  if (variant === 'dark-bar') {
    return /*#__PURE__*/jsx("ul", {
      className: ['flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-3 list-none p-0 m-0', className].join(' '),
      role: "list",
      "aria-label": ariaLabel,
      children: items.map((item, index) => /*#__PURE__*/jsxs("li", {
        className: "flex items-center gap-4 sm:gap-5",
        children: [index > 0 ? /*#__PURE__*/jsx("span", {
          className: "hidden sm:block h-4 w-px bg-white/20 shrink-0",
          "aria-hidden": "true"
        }) : null, /*#__PURE__*/jsxs("span", {
          className: "inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
          children: [/*#__PURE__*/jsx("span", {
            className: styles.value,
            children: item.value
          }), /*#__PURE__*/jsx("span", {
            className: styles.label,
            children: item.label
          })]
        })]
      }, `${item.label}-${index}`))
    });
  }
  const gridCols = columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3';
  return /*#__PURE__*/jsx("div", {
    className: [variant === 'hero' ? 'flex flex-wrap gap-8' : `grid ${gridCols} gap-6`, styles.container, className].join(' '),
    role: "list",
    "aria-label": ariaLabel,
    children: items.map((item, index) => /*#__PURE__*/jsxs("div", {
      role: "listitem",
      children: [/*#__PURE__*/jsx("p", {
        className: styles.value,
        children: item.value
      }), /*#__PURE__*/jsx("p", {
        className: styles.label,
        children: item.label
      })]
    }, `${item.label}-${index}`))
  });
}

function TimelineSection({
  steps,
  kicker,
  title,
  intro,
  variant = 'horizontal',
  light = false,
  className = '',
  'aria-label': ariaLabel = 'Timeline'
}) {
  const showHeader = Boolean(kicker || title || intro);
  return /*#__PURE__*/jsxs("section", {
    className: className,
    "aria-label": ariaLabel,
    children: [showHeader ? /*#__PURE__*/jsx(SectionHeader, {
      kicker: kicker,
      title: title !== null && title !== void 0 ? title : '',
      intro: intro,
      light: light,
      className: "mb-12"
    }) : null, variant === 'vertical' ? /*#__PURE__*/jsx("ol", {
      className: "relative space-y-8 border-s border-brand-whisper-border dark:border-white/10 ps-6 list-none m-0 p-0",
      children: steps.map((step, index) => /*#__PURE__*/jsxs("li", {
        className: "relative",
        children: [/*#__PURE__*/jsx("span", {
          className: ['absolute -start-[1.6rem] top-1 flex h-8 w-8 items-center justify-center rounded-xl text-[13px] font-bold', light ? 'bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow' : 'bg-brand-navy/[0.06] dark:bg-white/10 text-brand-navy dark:text-brand-yellow border border-brand-whisper-border dark:border-white/10'].join(' '),
          "aria-hidden": "true",
          children: step.step
        }), /*#__PURE__*/jsx("h3", {
          className: ['text-[16px] font-semibold mb-2', light ? 'text-white' : 'text-brand-navy dark:text-brand-off-white'].join(' '),
          children: step.title
        }), step.description ? /*#__PURE__*/jsx("p", {
          className: ['text-[14px] leading-relaxed', light ? 'text-white/55' : 'text-brand-secondary dark:text-brand-text-muted'].join(' '),
          children: step.description
        }) : null]
      }, `${step.step}-${index}`))
    }) : /*#__PURE__*/jsx("ol", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 list-none m-0 p-0",
      children: steps.map((step, index) => /*#__PURE__*/jsxs("li", {
        className: "relative",
        children: [index < steps.length - 1 ? /*#__PURE__*/jsx("div", {
          className: "hidden lg:block absolute top-5 start-full w-full h-px bg-white/[0.08] dark:bg-white/[0.08] -translate-y-px z-0",
          "aria-hidden": "true"
        }) : null, /*#__PURE__*/jsxs("div", {
          className: "relative z-10",
          children: [/*#__PURE__*/jsx("div", {
            className: ['w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[14px] mb-4', light ? 'bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow' : 'bg-brand-navy/[0.06] dark:bg-white/10 text-brand-navy dark:text-brand-yellow border border-brand-whisper-border dark:border-white/10'].join(' '),
            "aria-hidden": "true",
            children: step.step
          }), /*#__PURE__*/jsx("h3", {
            className: ['text-[16px] font-semibold mb-2', light ? 'text-white' : 'text-brand-navy dark:text-brand-off-white'].join(' '),
            children: step.title
          }), step.description ? /*#__PURE__*/jsx("p", {
            className: ['text-[14px] leading-relaxed', light ? 'text-white/55' : 'text-brand-secondary dark:text-brand-text-muted'].join(' '),
            children: step.description
          }) : null]
        })]
      }, `${step.step}-${index}`))
    })]
  });
}

function BentoGrid({
  children,
  className = ''
}) {
  return /*#__PURE__*/jsx("div", {
    className: ['grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr', className].join(' '),
    children: children
  });
}
const colSpanClasses = {
  1: '',
  2: 'sm:col-span-2',
  3: 'sm:col-span-2 lg:col-span-3'
};
const rowSpanClasses = {
  1: '',
  2: 'row-span-2'
};
function BentoItem({
  children,
  colSpan = 1,
  rowSpan = 1,
  className = ''
}) {
  return /*#__PURE__*/jsx("div", {
    className: ['rounded-2xl border border-brand-whisper-border bg-brand-surface', 'dark:bg-brand-navy/40 dark:border-brand-light-border p-6', colSpanClasses[colSpan], rowSpanClasses[rowSpan], className].join(' '),
    children: children
  });
}

function FaqAccordion({
  items,
  className = '',
  'aria-label': ariaLabel = 'Frequently asked questions'
}) {
  return /*#__PURE__*/jsx("div", {
    className: ['divide-y divide-brand-whisper-border dark:divide-white/10', className].join(' '),
    role: "region",
    "aria-label": ariaLabel,
    children: items.map((faq, index) => /*#__PURE__*/jsxs("details", {
      className: "group py-5 first:pt-0 last:pb-0",
      children: [/*#__PURE__*/jsxs("summary", {
        className: ['flex cursor-pointer select-none list-none items-start justify-between gap-4', 'text-[15px] font-semibold text-brand-navy dark:text-brand-off-white', '[&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2', 'focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-sm'].join(' '),
        children: [/*#__PURE__*/jsx("span", {
          children: faq.question
        }), /*#__PURE__*/jsx("span", {
          className: ['mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', 'border border-brand-navy/20 dark:border-white/20 text-[11px]', 'text-brand-navy/50 dark:text-white/50 transition-transform duration-200 group-open:rotate-180'].join(' '),
          "aria-hidden": "true",
          children: "\u25BE"
        })]
      }), /*#__PURE__*/jsx("p", {
        className: "mt-3 text-[14px] leading-relaxed text-brand-secondary dark:text-brand-text-muted",
        children: faq.answer
      })]
    }, `${faq.question}-${index}`))
  });
}

function CellValue({
  value
}) {
  if (typeof value === 'boolean') {
    return value ? /*#__PURE__*/jsx(Check, {
      size: 18,
      className: "text-brand-success mx-auto",
      "aria-label": "Included"
    }) : /*#__PURE__*/jsx(Minus, {
      size: 18,
      className: "text-brand-secondary/40 dark:text-brand-text-muted/40 mx-auto",
      "aria-label": "Not included"
    });
  }
  return /*#__PURE__*/jsx("span", {
    className: "text-[13px] text-brand-secondary dark:text-brand-text-muted",
    children: value
  });
}
function ComparisonTable({
  columns,
  rows,
  highlightColumn,
  className = '',
  'aria-label': ariaLabel = 'Service comparison'
}) {
  return /*#__PURE__*/jsx("div", {
    className: ['overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0', className].join(' '),
    children: /*#__PURE__*/jsxs("table", {
      className: "w-full min-w-[560px] border-collapse text-start",
      "aria-label": ariaLabel,
      children: [/*#__PURE__*/jsx("thead", {
        children: /*#__PURE__*/jsxs("tr", {
          children: [/*#__PURE__*/jsx("th", {
            scope: "col",
            className: "text-start text-[12px] font-bold uppercase tracking-wide text-brand-secondary dark:text-brand-text-muted pb-4 pe-4 w-[40%]",
            children: "Feature"
          }), columns.map((column, index) => /*#__PURE__*/jsx("th", {
            scope: "col",
            className: ['text-center text-[13px] font-semibold pb-4 px-3', highlightColumn === index ? 'text-brand-navy dark:text-brand-yellow' : 'text-brand-navy dark:text-brand-off-white'].join(' '),
            children: column
          }, column))]
        })
      }), /*#__PURE__*/jsx("tbody", {
        children: rows.map(row => /*#__PURE__*/jsxs("tr", {
          className: "border-t border-brand-whisper-border dark:border-white/10",
          children: [/*#__PURE__*/jsx("th", {
            scope: "row",
            className: "py-3 pe-4 text-[14px] font-medium text-brand-navy dark:text-brand-off-white text-start align-middle",
            children: row.label
          }), row.values.map((value, index) => /*#__PURE__*/jsx("td", {
            className: ['py-3 px-3 text-center align-middle', highlightColumn === index ? 'bg-brand-yellow/5 dark:bg-brand-yellow/10' : ''].join(' '),
            children: /*#__PURE__*/jsx(CellValue, {
              value: value
            })
          }, `${row.label}-${index}`))]
        }, row.label))
      })]
    })
  });
}

function TabbedShowcase({
  tabs,
  defaultTabId,
  className = '',
  'aria-label': ariaLabel = 'Showcase tabs'
}) {
  var _a, _b, _c;
  const [activeId, setActiveId] = useState((_b = defaultTabId !== null && defaultTabId !== void 0 ? defaultTabId : (_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '');
  if (tabs.length === 0) {
    return null;
  }
  const activeTab = (_c = tabs.find(tab => tab.id === activeId)) !== null && _c !== void 0 ? _c : tabs[0];
  return /*#__PURE__*/jsxs("div", {
    className: className,
    children: [/*#__PURE__*/jsx("div", {
      role: "tablist",
      "aria-label": ariaLabel,
      className: "flex flex-wrap gap-2 mb-6",
      children: tabs.map(tab => {
        const selected = tab.id === activeTab.id;
        return /*#__PURE__*/jsx("button", {
          type: "button",
          role: "tab",
          id: `tab-${tab.id}`,
          "aria-selected": selected,
          "aria-controls": `panel-${tab.id}`,
          onClick: () => setActiveId(tab.id),
          className: ['rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-150', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2', selected ? 'bg-brand-navy text-white dark:bg-brand-yellow dark:text-brand-navy' : 'bg-brand-navy/[0.06] text-brand-navy dark:bg-white/10 dark:text-brand-off-white hover:bg-brand-navy/10'].join(' '),
          children: tab.label
        }, tab.id);
      })
    }), /*#__PURE__*/jsx("div", {
      role: "tabpanel",
      id: `panel-${activeTab.id}`,
      "aria-labelledby": `tab-${activeTab.id}`,
      className: "rounded-2xl border border-brand-whisper-border dark:border-white/10 bg-brand-surface dark:bg-brand-navy/40 p-6",
      children: activeTab.content
    })]
  });
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return prefersReducedMotion;
}
function LogoMarquee({
  items,
  duration = 40,
  reverse = false,
  className = '',
  'aria-label': ariaLabel = 'Client logos'
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const duplicated = prefersReducedMotion ? items : [...items, ...items];
  const animClass = prefersReducedMotion ? '' : reverse ? 'animate-marquee-right' : 'animate-marquee-left';
  return /*#__PURE__*/jsx("div", {
    className: ['overflow-hidden relative', className].join(' '),
    "aria-label": ariaLabel,
    children: /*#__PURE__*/jsx("div", {
      className: [prefersReducedMotion ? 'flex flex-wrap justify-center gap-8 items-center' : 'flex w-max gap-10 items-center', animClass].join(' '),
      style: prefersReducedMotion ? undefined : {
        animationDuration: `${duration}s`
      },
      children: duplicated.map((item, index) => {
        const img = /*#__PURE__*/jsx("img", {
          src: item.src,
          alt: item.alt,
          className: "h-8 sm:h-10 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200",
          loading: "lazy"
        });
        return item.href ? /*#__PURE__*/jsx("a", {
          href: item.href,
          className: "shrink-0",
          children: img
        }, `${item.alt}-${index}`) : /*#__PURE__*/jsx("span", {
          className: "shrink-0",
          children: img
        }, `${item.alt}-${index}`);
      })
    })
  });
}

export { Badge, BentoGrid, BentoItem, Button, Card, CaseStudyCard, ComparisonTable, FaqAccordion, FeatureCard, Input, LogoMarquee, MasterSwatch, MetricStrip, SectionHeader, ServiceCard, TabbedShowcase, TestimonialCard, TimelineSection, buttonSizeClasses, buttonVariantClasses, getButtonClasses };
