'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0$2 = require('tailwindcss/plugin');
var require$$0$1 = require('tailwindcss/lib/util/escapeClassName');

function _mergeNamespaces(n, m) {
	m.forEach(function (e) {
		e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
			if (k !== 'default' && !(k in n)) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	});
	return Object.freeze(n);
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

const { default: escapeClassName } = require$$0$1;


const asClass = (name) => `.${escapeClassName(name)}`;

var nameClass$7 = (classPrefix, key) => {
  if (['default', 'DEFAULT'].includes(key)) {
    return asClass(classPrefix);
  }

  if (key === '-') {
    return asClass(`-${classPrefix}`);
  }

  if (key.startsWith('-')) {
    return asClass(`-${classPrefix}${key}`);
  }

  return asClass(`${classPrefix}-${key}`);
};

var nameClass_default = /*@__PURE__*/getDefaultExportFromCjs(nameClass$7);

var nameClass$8 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: nameClass_default
}, [nameClass$7]);

var require$$0 = /*@__PURE__*/getAugmentedNamespace(nameClass$8);

const nameClass$6 = require$$0;

var paddingUtilities$1 = (theme) => {
  const generators = [
    ([modifier, size]) => ({
      [nameClass$6('ps', modifier)]: { paddingInlineStart: size },
      [nameClass$6('pe', modifier)]: { paddingInlineEnd: size },
    }),
  ];

  return generators.flatMap(generator => Object.entries(theme('padding')).flatMap(generator));
};

var paddingUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(paddingUtilities$1);

var paddingUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: paddingUtilities_default
}, [paddingUtilities$1]);

var require$$1 = /*@__PURE__*/getAugmentedNamespace(paddingUtilities$2);

const nameClass$5 = require$$0;

var marginUtilities$1 = (theme) => {
  const generators = [([modifier, size]) => ({
    [nameClass$5('ms', modifier)]: { marginInlineStart: size },
    [nameClass$5('me', modifier)]: { marginInlineEnd: size },
  })];

  return generators.flatMap(generator => Object.entries(theme('margin')).flatMap(generator));
};

var marginUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(marginUtilities$1);

var marginUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: marginUtilities_default
}, [marginUtilities$1]);

var require$$2 = /*@__PURE__*/getAugmentedNamespace(marginUtilities$2);

const utilities$3 = () => ({
  '[dir="rtl"] .float-start': { float: 'right' },
  '[dir="rtl"] .float-end': { float: 'left' },
  '[dir="ltr"] .float-end': { float: 'right' },
  '[dir="ltr"] .float-start': { float: 'left' },
});

var floatUtilities$1 = utilities$3;

var floatUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(floatUtilities$1);

var floatUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: floatUtilities_default
}, [floatUtilities$1]);

var require$$3 = /*@__PURE__*/getAugmentedNamespace(floatUtilities$2);

const nameClass$4 = require$$0;

var insetUtilities$1 = (theme) => {
  const generators = [
    ([modifier, size]) => ({
      ['[dir="rtl"] ' + nameClass$4('start', modifier)]: {
        right: size,
      },
      ['[dir="rtl"] ' + nameClass$4('end', modifier)]: {
        left: size,
      },
      ['[dir="ltr"] ' + nameClass$4('end', modifier)]: {
        right: size,
      },
      ['[dir="ltr"] ' + nameClass$4('start', modifier)]: {
        left: size,
      },
    }),
  ];
  return generators.flatMap(generator => Object.entries(theme('inset')).flatMap(generator));
};

var insetUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(insetUtilities$1);

var insetUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: insetUtilities_default
}, [insetUtilities$1]);

var require$$4 = /*@__PURE__*/getAugmentedNamespace(insetUtilities$2);

const utilities$2 = () => ({
  '[dir="ltr"] .clear-start': { clear: 'left' },
  '[dir="ltr"] .clear-end': { clear: 'right' },
  '[dir="rtl"] .clear-start': { clear: 'right' },
  '[dir="rtl"] .clear-end': { clear: 'left' },
});

var clearUtilities$1 = utilities$2;

var clearUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(clearUtilities$1);

var clearUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: clearUtilities_default
}, [clearUtilities$1]);

var require$$5 = /*@__PURE__*/getAugmentedNamespace(clearUtilities$2);

const nameClass$3 = require$$0;

var borderRadiusUtilities$1 = (theme) => {
  const generators = [
    ([modifier, value]) => ({
      ['[dir="ltr"] ' + nameClass$3('rounded-e', modifier)]: {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      },
      ['[dir="ltr"] ' + nameClass$3('rounded-s', modifier)]: {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      },
      ['[dir="rtl"] ' + nameClass$3('rounded-e', modifier)]: {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      },
      ['[dir="rtl"] ' + nameClass$3('rounded-s', modifier)]: {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      },
    }),
    ([modifier, value]) => ({
      ['[dir="ltr"] ' + nameClass$3('rounded-ts', modifier)]: { borderTopLeftRadius: value },
      ['[dir="ltr"] ' + nameClass$3('rounded-te', modifier)]: { borderTopRightRadius: value },
      ['[dir="ltr"] ' + nameClass$3('rounded-be', modifier)]: { borderBottomRightRadius: value },
      ['[dir="ltr"] ' + nameClass$3('rounded-bs', modifier)]: { borderBottomLeftRadius: value },
      ['[dir="rtl"] ' + nameClass$3('rounded-te', modifier)]: { borderTopLeftRadius: value },
      ['[dir="rtl"] ' + nameClass$3('rounded-ts', modifier)]: { borderTopRightRadius: value },
      ['[dir="rtl"] ' + nameClass$3('rounded-bs', modifier)]: { borderBottomRightRadius: value },
      ['[dir="rtl"] ' + nameClass$3('rounded-be', modifier)]: { borderBottomLeftRadius: value },
    }),
  ];

  return generators.flatMap(generator => Object.entries(theme('borderRadius')).flatMap(generator));
};

var borderRadiusUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(borderRadiusUtilities$1);

var borderRadiusUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: borderRadiusUtilities_default
}, [borderRadiusUtilities$1]);

var require$$6 = /*@__PURE__*/getAugmentedNamespace(borderRadiusUtilities$2);

const nameClass$2 = require$$0;

var borderWidthUtilities$1 = (theme) => {
  const generators = [
    ([modifier, value]) => ({
      [nameClass$2('border-e', modifier)]: { borderInlineEndWidth: value },
      [nameClass$2('border-s', modifier)]: { borderInlineStartWidth: value },
    }),
  ];

  return generators.flatMap(generator => Object.entries(theme('borderWidth')).flatMap(generator));
};

var borderWidthUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(borderWidthUtilities$1);

var borderWidthUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: borderWidthUtilities_default
}, [borderWidthUtilities$1]);

var require$$7 = /*@__PURE__*/getAugmentedNamespace(borderWidthUtilities$2);

const utilities$1 = () => ({
  '[dir="rtl"] .text-start': { 'text-align': 'right' },
  '[dir="rtl"] .text-end': { 'text-align': 'left' },
  '[dir="ltr"] .text-end': { 'text-align': 'right' },
  '[dir="ltr"] .text-start': { 'text-align': 'left' },
});

var textAlignUtilities$1 = utilities$1;

var textAlignUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(textAlignUtilities$1);

var textAlignUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: textAlignUtilities_default
}, [textAlignUtilities$1]);

var require$$8 = /*@__PURE__*/getAugmentedNamespace(textAlignUtilities$2);

const utilities = () => ({
  '[dir="ltr"] .origin-top-start': { 'transform-origin': 'top left' },
  '[dir="ltr"] .origin-top-end': { 'transform-origin': 'top right' },
  '[dir="ltr"] .origin-bottom-start': { 'transform-origin': 'bottom left' },
  '[dir="ltr"] .origin-bottom-end': { 'transform-origin': 'bottom right' },
  '[dir="ltr"] .origin-start': { 'transform-origin': 'left' },
  '[dir="ltr"] .origin-end': { 'transform-origin': 'right' },
  '[dir="rtl"] .origin-top-start': { 'transform-origin': 'top right' },
  '[dir="rtl"] .origin-top-end': { 'transform-origin': 'top left' },
  '[dir="rtl"] .origin-bottom-start': { 'transform-origin': 'bottom right' },
  '[dir="rtl"] .origin-bottom-end': { 'transform-origin': 'bottom left' },
  '[dir="rtl"] .origin-start': { 'transform-origin': 'right' },
  '[dir="rtl"] .origin-end': { 'transform-origin': 'left' },
});

var transformOriginUtilities$1 = utilities;

var transformOriginUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(transformOriginUtilities$1);

var transformOriginUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: transformOriginUtilities_default
}, [transformOriginUtilities$1]);

var require$$9 = /*@__PURE__*/getAugmentedNamespace(transformOriginUtilities$2);

const nameClass$1 = require$$0;

var spaceUtilities$1 = (theme) => {
  const generators = [
    ([modifier, _size]) => {
      const size = _size === '0' ? '0px' : _size;
      return {
        [`${nameClass$1('space-s', modifier)} > :not([hidden]) ~ :not([hidden])`]: {
          '--tw-space-s-reverse': '0',
          marginInlineEnd: `calc(${size} * var(--tw-space-s-reverse))`,
          marginInlineStart: `calc(${size} * calc(1 - var(--tw-space-s-reverse)))`,
        },
      };
    },
  ];

  const spaceReverse = {
    '.space-s-reverse > :not([hidden]) ~ :not([hidden])': {
      '--tw-space-s-reverse': '1',
    },
  };

  return [
    ...generators.flatMap((generator) => Object.entries(theme('space')).flatMap(generator)),
    spaceReverse,
  ];
};

var spaceUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(spaceUtilities$1);

var spaceUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: spaceUtilities_default
}, [spaceUtilities$1]);

var require$$10 = /*@__PURE__*/getAugmentedNamespace(spaceUtilities$2);

const nameClass = require$$0;

var divideUtilities$1 = (theme) => {
  const generators = [
    ([modifier, _size]) => {
      const size = _size === '0' ? '0px' : _size;
      return {
        [`${nameClass('divide-s', modifier)} > :not([hidden]) ~ :not([hidden])`]: {
          '--tw-divide-s-reverse': '0',
          borderInlineEndWidth: `calc(${size} * var(--tw-divide-s-reverse))`,
          borderInlineStartWidth: `calc(${size} * calc(1 - var(--tw-divide-s-reverse)))`,
        },
      };
    },
  ];

  const divideReverse = {
    '.divide-s-reverse > :not([hidden]) ~ :not([hidden])': {
      '--tw-divide-s-reverse': '1',
    },
  };

  return [
    ...generators.flatMap(generator => Object.entries(theme('divideWidth')).flatMap(generator)), 
    divideReverse,
  ] ;
};

var divideUtilities_default = /*@__PURE__*/getDefaultExportFromCjs(divideUtilities$1);

var divideUtilities$2 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: divideUtilities_default
}, [divideUtilities$1]);

var require$$11 = /*@__PURE__*/getAugmentedNamespace(divideUtilities$2);

const plugin = require$$0$2;

const paddingUtilities = require$$1;
const marginUtilities = require$$2;
const floatUtilities = require$$3;
const insetUtilities = require$$4;
const clearUtilities = require$$5;
const borderRadiusUtilities = require$$6;
const borderWidthUtilities = require$$7;
const textAlignUtilities = require$$8;
const transformOriginUtilities = require$$9;
const spaceUtilities = require$$10;
const divideUtilities = require$$11;

var src = plugin(({ addUtilities, theme, variants }) => {
  addUtilities(paddingUtilities(theme), variants('padding'));
  addUtilities(marginUtilities(theme), variants('margin'));
  addUtilities(insetUtilities(theme), variants('inset'));
  addUtilities(borderRadiusUtilities(theme), variants('borderRadius'));
  addUtilities(clearUtilities(), variants('clear'));
  addUtilities(floatUtilities(), variants('float'));
  addUtilities(borderWidthUtilities(theme), variants('borderWidth'));
  addUtilities(textAlignUtilities(), variants('textAlign'));
  addUtilities(transformOriginUtilities(), variants('transformOrigin'));
  addUtilities(spaceUtilities(theme), variants('space'));
  addUtilities(divideUtilities(theme), variants('divide'));
});

var tailwindcssRtl = /*@__PURE__*/getDefaultExportFromCjs(src);

const mbPreset = {
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display, var(--font-poppins))', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          yellow: '#FFC107',
          'yellow-dark': '#92610B',
          blue: '#2196F3',
          'dark-blue': '#1565C0',
          navy: '#072A6B',
          charcoal: '#0D0F12',
          'deep-charcoal': '#0D0F12',
          'muted-steel': '#9E9E9E',
          secondary: 'var(--brand-text-secondary, #666666)',
          text: 'var(--brand-text, #333333)',
          'text-muted': 'var(--brand-text-muted, #666666)',
          'off-white': 'var(--brand-off-white, #FFFFFF)',
          'light-border': 'var(--brand-light-border, #F5F5F5)',
          'whisper-border': 'var(--brand-whisper-border, #E8E8E8)',
          'input-border': 'var(--brand-input-border, #E0E0E0)',
          canvas: 'var(--brand-canvas, #FAFAFA)',
          surface: 'var(--brand-surface, #FFFFFF)',
          success: '#16A34A',
          'success-bg': '#DCFCE7',
          warning: '#CA8A04',
          'warning-bg': '#FEF9C3',
          error: '#DC2626',
          'error-bg': '#FEE2E2',
          info: '#0369A1',
          'info-bg': '#E0F2FE'
        }
      },
      borderRadius: {
        lg: '12px',
        xl: '16px'
      },
      spacing: {
        'section-xs': 'var(--space-xs)',
        'section-sm': 'var(--space-sm)',
        'section-md': 'var(--space-md)',
        'section-lg': 'var(--space-lg)',
        'section-xl': 'var(--space-xl)',
        'section-2xl': 'var(--space-2xl)',
        'section-3xl': 'var(--space-3xl)',
        'section-4xl': 'var(--space-4xl)',
        'section-5xl': 'var(--space-5xl)',
        128: '32rem',
        144: '36rem'
      },
      fontSize: {
        'display-sm': ['1.75rem', {
          lineHeight: '1.15',
          letterSpacing: '-0.02em'
        }],
        'display-md': ['2.125rem', {
          lineHeight: '1.12',
          letterSpacing: '-0.02em'
        }],
        'display-lg': ['2.5rem', {
          lineHeight: '1.1',
          letterSpacing: '-0.025em'
        }],
        'body-sm': ['0.8125rem', {
          lineHeight: '1.5'
        }],
        'body-md': ['0.9375rem', {
          lineHeight: '1.6'
        }],
        'body-lg': ['1.0625rem', {
          lineHeight: '1.65'
        }],
        kicker: ['0.6875rem', {
          lineHeight: '1.4',
          letterSpacing: '0.12em'
        }]
      }
    }
  },
  plugins: [tailwindcssRtl]
};

exports.default = mbPreset;
exports.mbPreset = mbPreset;
