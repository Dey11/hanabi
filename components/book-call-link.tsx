import { BOOK_A_CALL } from "@/lib/constants";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type BookCallLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href"
> & {
  children: ReactNode;
};

export default function BookCallLink({
  children,
  ...anchorProps
}: BookCallLinkProps) {
  return (
    <a {...anchorProps} href={BOOK_A_CALL}>
      {children}
    </a>
  );
}
