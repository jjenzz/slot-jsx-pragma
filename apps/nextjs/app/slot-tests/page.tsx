import * as Client from '@/components/client';
import * as Server from '@/components/server';

export default function Page() {
  return (
    <main className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950 p-8 mb-8 border border-zinc-800">
          <h1 className="text-3xl font-bold text-white mb-2">Slot Tests</h1>
          <p className="text-zinc-400 text-sm">All components should be rendered as links</p>
        </div>

        <div className="bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950 p-8 space-y-8 border border-zinc-800">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.LinkButton
            </h2>
            <Client.LinkButton
              href="/"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              children
            </Client.LinkButton>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.Button as Client.Link
            </h2>
            <Client.Button asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Client.Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.Button as Server.Link
            </h2>
            <Client.Button asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Client.Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.Button as Client.LinkSlottable
            </h2>
            <Client.Button asChild>
              <Client.LinkSlottable
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.LinkSlottable>
            </Client.Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.Button as Server.LinkSlottable
            </h2>
            <Client.Button asChild>
              <Server.LinkSlottable
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.LinkSlottable>
            </Client.Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonSlottable as Server.Link
            </h2>
            <Client.ButtonSlottable asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Client.ButtonSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonSlottable as Client.Link
            </h2>
            <Client.ButtonSlottable asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Client.ButtonSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonNestedSlottable as Server.Link
            </h2>
            <Client.ButtonNestedSlottable asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Client.ButtonNestedSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonNestedSlottable as Client.Link
            </h2>
            <Client.ButtonNestedSlottable asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Client.ButtonNestedSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.IconButtonNestedSlottable as Server.Link
            </h2>
            <Client.IconButtonNestedSlottable asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Client.IconButtonNestedSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.IconButtonNestedSlottable as Client.Link
            </h2>
            <Client.IconButtonNestedSlottable asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Client.IconButtonNestedSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.LinkButton
            </h2>
            <Server.LinkButton
              href="/"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              children
            </Server.LinkButton>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.Button as Server.Link
            </h2>
            <Server.Button asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Server.Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.Button as Client.Link
            </h2>
            <Server.Button asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Server.Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.Button as Server.LinkSlottable
            </h2>
            <Server.Button asChild>
              <Server.LinkSlottable
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.LinkSlottable>
            </Server.Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.Button as Client.LinkSlottable
            </h2>
            <Server.Button asChild>
              <Client.LinkSlottable
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.LinkSlottable>
            </Server.Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonSlottable as Client.Link
            </h2>
            <Server.ButtonSlottable asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Server.ButtonSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonSlottable as Server.Link
            </h2>
            <Server.ButtonSlottable asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Server.ButtonSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonNestedSlottable as Client.Link
            </h2>
            <Server.ButtonNestedSlottable asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Server.ButtonNestedSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonNestedSlottable as Server.Link
            </h2>
            <Server.ButtonNestedSlottable asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Server.ButtonNestedSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.IconButtonNestedSlottable as Server.Link
            </h2>
            <Server.IconButtonNestedSlottable asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Server.IconButtonNestedSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.IconButtonNestedSlottable as Client.Link
            </h2>
            <Server.IconButtonNestedSlottable asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Server.IconButtonNestedSlottable>
          </section>
        </div>
      </div>
    </main>
  );
}
