import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 12c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4v8h16v-8z" />
      <path d="M4 12V8c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v4" />
      <path d="M12 12v10" />
      <path d="M12 8V4" />
      <path d="M8 12H4" />
      <path d="M16 12h4" />
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    </svg>
  );
}

export function SosIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
