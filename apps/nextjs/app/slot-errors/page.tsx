import * as Client from '@/components/client';
import * as Server from '@/components/server';

export default function Page() {
  return (
    <main className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950 p-8 mb-8 border border-zinc-800">
          <h1 className="text-3xl font-bold text-white mb-2">Slot Errors</h1>
          <p className="text-zinc-400 text-sm">
            All components should log errors to the console with a stack trace that indicates which
            component caused the error.
          </p>
        </div>

        <div className="bg-red-950/50 rounded-lg shadow-lg shadow-zinc-950 p-8 mt-8 border border-red-900">
          <div className="space-y-8">
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-red-900 pb-2">
                Client.Button asChild with no children
              </h3>
              <Client.Button asChild className="bg-red-500" />
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-red-900 pb-2">
                Client.Button asChild with text-only children
              </h3>
              <Client.Button asChild className="bg-red-500">
                just text, no element
              </Client.Button>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-red-900 pb-2">
                Client.Button asChild with multiple children (no Slottable)
              </h3>
              <Client.Button asChild className="bg-red-500">
                <span className="text-zinc-400">First child</span>
                <span className="text-zinc-400">Second child</span>
              </Client.Button>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-red-900 pb-2">
                Client.ButtonSlottable asChild with multiple children (has Slottable but no single
                valid element)
              </h3>
              <Client.ButtonSlottable asChild className="bg-red-500">
                <span className="text-zinc-400">First</span>
                <span className="text-zinc-400">Second</span>
              </Client.ButtonSlottable>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-red-900 pb-2">
                Server.Button asChild with no children
              </h3>
              <Server.Button asChild className="bg-red-500" />
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-red-900 pb-2">
                Server.Button asChild with mixed invalid content
              </h3>
              <Server.Button asChild className="bg-red-500">
                text before
                <span className="text-zinc-400">element</span>
                text after
              </Server.Button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
