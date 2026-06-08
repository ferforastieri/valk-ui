import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

const outlineProps = {
  fill: 'none',
  viewBox: '0 0 24 24',
  strokeWidth: 1.5,
  stroke: 'currentColor',
} as const

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  )
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

export function XMarkIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

export function Bars3Icon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

export function MagnifyingGlassIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.2-5.2m0 0A7.5 7.5 0 1 0 5.2 5.2a7.5 7.5 0 0 0 10.6 10.6Z" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 5.25h13.5c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5H5.25c-.83 0-1.5-.67-1.5-1.5v-12c0-.83.67-1.5 1.5-1.5Z" />
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5m-15 0H3m15.36-6.36-1.06 1.06M6.7 17.3l-1.06 1.06m12.72 0-1.06-1.06M6.7 6.7 5.64 5.64M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A8.25 8.25 0 1 1 11.2 3a6.75 6.75 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

export function XCircleIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

export function ExclamationCircleIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v4.5m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

export function InformationCircleIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.04-.02a.75.75 0 0 1 1.04.69l-.36 2.16a.75.75 0 0 0 1.04.69l.04-.02M12 8.25h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

export function ArrowDownTrayIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 10.5 12 15m0 0 4.5-4.5M12 15V3" />
    </svg>
  )
}

export function CodeBracketIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 21 12l-3.75 5.25M6.75 6.75 3 12l3.75 5.25M14.25 4.5l-4.5 15" />
    </svg>
  )
}

export function ClipboardIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5h6m-6 0A2.25 2.25 0 0 0 6.75 6.75v.75h10.5v-.75A2.25 2.25 0 0 0 15 4.5m-6 0A2.25 2.25 0 0 1 11.25 2.25h1.5A2.25 2.25 0 0 1 15 4.5m3.75 3v12A2.25 2.25 0 0 1 16.5 21h-9a2.25 2.25 0 0 1-2.25-2.25v-12" />
    </svg>
  )
}

export function ArrowPathIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V7.5H12.75M7.5 20.25V16.5h3.75M18.9 9a7.5 7.5 0 0 0-12.4-2.5L3.75 9M5.1 15a7.5 7.5 0 0 0 12.4 2.5L20.25 15" />
    </svg>
  )
}

export function SwatchIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5 15.75 8.25a3.18 3.18 0 0 0-4.5-4.5L4.5 10.5v9Zm0 0h9m1.5-10.5 3.75 3.75a2.25 2.25 0 0 1 0 3.18L15.18 19.5" />
    </svg>
  )
}

export function BookOpenIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75A6.75 6.75 0 0 0 5.25 3H3.75v15h1.5A6.75 6.75 0 0 1 12 21m0-14.25A6.75 6.75 0 0 1 18.75 3h1.5v15h-1.5A6.75 6.75 0 0 0 12 21m0-14.25V21" />
    </svg>
  )
}

export function DocumentTextIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h6L18 8.25v12H7.5A1.5 1.5 0 0 1 6 18.75V5.25a1.5 1.5 0 0 1 1.5-1.5Zm6 0v4.5H18M9 12h6M9 15h6M9 18h3" />
    </svg>
  )
}

export function CubeIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 8.25 4.5v9L12 21l-8.25-4.5v-9L12 3Zm0 0v9m0 9v-9m0 0 8.25-4.5M12 12 3.75 7.5" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75V12l3.75 2.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 10.5 9-7.5 9 7.5M5.25 9v10.5h4.5V15h4.5v4.5h4.5V9" />
    </svg>
  )
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...outlineProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.65 5.1L18.75 9.75l-5.1 1.65L12 16.5l-1.65-5.1-5.1-1.65 5.1-1.65L12 3Zm6.75 10.5.9 2.85 2.85.9-2.85.9-.9 2.85-.9-2.85-2.85-.9 2.85-.9.9-2.85ZM5.25 13.5l.75 2.25 2.25.75-2.25.75-.75 2.25-.75-2.25-2.25-.75 2.25-.75.75-2.25Z" />
    </svg>
  )
}
