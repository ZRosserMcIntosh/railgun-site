'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import {
  Inbox,
  Send,
  PenSquare,
  LogOut,
  Loader2,
  User,
  Mail,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/app/mail/inbox', label: 'Inbox', icon: Inbox },
  { href: '/app/mail/sent', label: 'Sent', icon: Send },
  { href: '/app/mail/compose', label: 'Compose', icon: PenSquare },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-primary">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background-primary">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-foreground-secondary/10 bg-background-secondary">
        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-foreground-secondary/10 px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent p-1">
              <Image
                src="/logo.png"
                alt="Rail Gun"
                width={24}
                height={24}
                className="h-full w-full brightness-0 invert"
              />
            </div>
            <span className="text-lg font-bold">Rail Gun</span>
          </Link>
          <div className="ml-auto rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            <Mail className="inline h-3 w-3" /> Mail
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'bg-accent/10 font-medium text-accent'
                      : 'text-foreground-secondary hover:bg-background-elevated hover:text-foreground-primary',
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-foreground-secondary/10 p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
              <User className="h-4 w-4 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {user?.displayName || user?.username || 'User'}
              </p>
              <p className="truncate text-xs text-foreground-tertiary">
                @{user?.username}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground-secondary transition-colors hover:bg-background-elevated hover:text-error"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  );
}
