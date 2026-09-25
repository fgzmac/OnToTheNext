"use client";
import { useEffect, useRef, type ReactNode } from "react";

export function DetailPanel({ title, children, close }: { title: string; children: ReactNode; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    const trigger = document.activeElement as HTMLElement | null;
    node?.showModal();
    return () => { node?.close(); trigger?.focus(); };
  }, []);
  return <dialog ref={dialog} className="composer-dialog travel-dusk" aria-label={title} onCancel={close} onClose={close}>
    <header className="row row-between"><h2>{title}</h2><button type="button" className="secondary" onClick={close} autoFocus aria-label="Close details">Close</button></header>
    <div className="stack">{children}</div>
  </dialog>;
}
