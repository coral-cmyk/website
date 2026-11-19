// The WhatsApp mark as a fine outline bubble with the handset drawn solid in the
// same colour — no white fill, no heavy lines. It follows the surrounding text colour.
export function WhatsAppLogo({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.45L3 20.5l1.55-4.7A8.5 8.5 0 1 1 20.5 11.6Z"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.1 7.8c.2-.35.45-.4.7-.4h.45c.2 0 .4.08.5.35l.75 1.75c.1.25.05.45-.1.65l-.55.65c-.15.2-.2.35-.1.55.5.95 1.25 1.7 2.2 2.2.2.1.35.05.55-.1l.75-.8c.2-.2.4-.25.65-.15l1.7.85c.25.1.35.25.35.45 0 .4-.2 1.05-.55 1.4-.4.35-.95.55-1.55.45-1.25-.2-2.75-.95-4.2-2.25-1.35-1.25-2.2-2.65-2.5-3.8-.2-.65-.05-1.3.25-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
