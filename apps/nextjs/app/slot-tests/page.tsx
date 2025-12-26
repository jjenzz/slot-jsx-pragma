import * as Client from '@/components/client';
import * as Server from '@/components/server';

export default function Page() {
  return (
    <main className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950 p-8 border border-zinc-800">
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
              Client.ButtonSiblingSlottable as Server.Link
            </h2>
            <Client.ButtonSiblingSlottable asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Client.ButtonSiblingSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonSiblingSlottable as Client.Link
            </h2>
            <Client.ButtonSiblingSlottable asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Client.ButtonSiblingSlottable>
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

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonSiblingSlottable as Server.Link
            </h2>
            <Server.ButtonSiblingSlottable asChild>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Server.ButtonSiblingSlottable>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonSiblingSlottable as Client.Link
            </h2>
            <Server.ButtonSiblingSlottable asChild>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Server.ButtonSiblingSlottable>
          </section>
        </div>

        <div className="bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950 p-8 space-y-8 border border-zinc-800">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonRender rendered as Client.Link element
            </h2>
            <Client.ButtonRender
              render={
                <Client.Link
                  href="/"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                />
              }
            >
              children
            </Client.ButtonRender>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonRender rendered as Server.Link element
            </h2>
            <Client.ButtonRender
              render={
                <Server.Link
                  href="/"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                />
              }
            >
              children
            </Client.ButtonRender>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonRenderProp render function as Client.Link
            </h2>
            <Client.ButtonRenderProp>children</Client.ButtonRenderProp>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonNestedRenderProp render function as Client.Link
            </h2>
            <Client.ButtonNestedRenderProp>children</Client.ButtonNestedRenderProp>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonRender rendered as Client.Link element
            </h2>
            <Server.ButtonRender
              render={
                <Client.Link
                  href="/"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                />
              }
            >
              children
            </Server.ButtonRender>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonRender rendered as Server.Link element
            </h2>
            <Server.ButtonRender
              render={
                <Server.Link
                  href="/"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                />
              }
            >
              children
            </Server.ButtonRender>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonRender render function as Server.Link element
            </h2>
            <Server.ButtonRender
              render={(props) => (
                <Server.Link
                  {...props}
                  href="/"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                />
              )}
            >
              children
            </Server.ButtonRender>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonRender render function as Client.Link element
            </h2>
            <Server.ButtonRender
              render={(props) => (
                <Client.Link
                  {...props}
                  href="/"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                />
              )}
            >
              children
            </Server.ButtonRender>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonNestedRender render function as Server.Link
            </h2>
            <Server.ButtonNestedRender
              render={(props) => (
                <Server.Link
                  href="/"
                  {...props}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                />
              )}
            >
              children
            </Server.ButtonNestedRender>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonNestedRender render function as Client.Link
            </h2>
            <Server.ButtonNestedRender
              render={(props) => (
                <Client.Link
                  href="/"
                  {...props}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                />
              )}
            >
              children
            </Server.ButtonNestedRender>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Client.ButtonRenderAsChildren (as=children, children=children)
            </h2>
            <Client.ButtonRenderAsChildren>
              <Client.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Client.Link>
            </Client.ButtonRenderAsChildren>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
              Server.ButtonRenderAsChildren (as=children, children=children)
            </h2>
            <Server.ButtonRenderAsChildren>
              <Server.Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                children
              </Server.Link>
            </Server.ButtonRenderAsChildren>
          </section>
        </div>

        <div className="bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950 p-8 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">Composition Tests</h2>
          <p className="text-zinc-400 text-sm mb-8">
            Tests for prop merging: className, style, event handlers, refs
          </p>

          <div className="space-y-8">
            <section className="space-y-3" data-testid="composition-classname">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
                className merging
              </h3>
              <Client.Button
                asChild
                className="outer-class text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                <Client.Link href="/" className="host-class">
                  className merge test
                </Client.Link>
              </Client.Button>
            </section>

            <section className="space-y-3" data-testid="composition-style">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
                style merging
              </h3>
              <Client.Button asChild style={{ color: 'red', padding: '10px' }}>
                <Client.Link
                  href="/"
                  style={{ backgroundColor: 'blue', padding: '20px' }}
                  className="underline underline-offset-2"
                >
                  style merge test
                </Client.Link>
              </Client.Button>
            </section>

            <section className="space-y-3" data-testid="composition-events">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
                Event handler merging
              </h3>
              <Client.CompositionEventTest />
            </section>

            <section className="space-y-3" data-testid="composition-refs">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
                Ref merging
              </h3>
              <Client.CompositionRefTest />
            </section>

            <section className="space-y-3" data-testid="composition-props">
              <h3 className="text-lg font-semibold text-zinc-200 border-b border-zinc-700 pb-2">
                Prop override (data attributes)
              </h3>
              <Client.Button asChild data-outer="outer-value" data-shared="outer">
                <Client.Link
                  href="/"
                  data-host="host-value"
                  data-shared="host"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  prop override test
                </Client.Link>
              </Client.Button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
