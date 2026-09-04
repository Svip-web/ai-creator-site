import type { AnchorHTMLAttributes, ReactNode } from 'react';

type StaticLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children?: ReactNode;
  href: string | { pathname?: string };
};

export default function StaticLink({ href, ...props }: StaticLinkProps) {
  const resolvedHref = typeof href === 'string' ? href : (href.pathname ?? '#');
  return <a href={resolvedHref} {...props} />;
}
