import { Fragment } from "react";

/**
 * Tiny inline markup for client-editable strings: `*like this*` becomes an
 * <em>, which every design already styles as the serif-italic accent. Keeps
 * the tweak panel's text fields plain text — no HTML the owner could break.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
