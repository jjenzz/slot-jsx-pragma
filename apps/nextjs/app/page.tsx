import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Slot JSX Pragma Test App
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This is a test application for the{' '}
            <code className="rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">slot-jsx</code>{' '}
            package, demonstrating slottable components with the{' '}
            <code className="rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">asChild</code>{' '}
            pattern in both React Server Components and client components.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors md:w-[200px]"
            href="/slot-tests"
          >
            Slot tests →
          </Link>

          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 text-white border-white px-5 transition-colors md:w-[200px]"
            href="/slot-errors"
          >
            Slot errors →
          </Link>
        </div>
      </main>
    </div>
  );
}
