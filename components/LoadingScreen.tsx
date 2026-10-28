import Image from "next/image"

export default function LoadingScreen({title, description} : {title: string; description: string}) {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center p-4">
      <style>{`
        @keyframes ld-eq {
          0%, 100% { transform: scaleY(0.25); }
          50% { transform: scaleY(1); }
        }
        @keyframes ld-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes ld-tip {
          0% { opacity: 0; transform: translateY(4px); }
          4%, 30% { opacity: 1; transform: translateY(0); }
          34%, 100% { opacity: 0; transform: translateY(-4px); }
        }
        .ld-bar { animation: ld-eq 1s ease-in-out infinite; }
        .ld-progress { animation: ld-slide 1.4s ease-in-out infinite; }
        .ld-tip { opacity: 0; animation: ld-tip 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ld-bar, .ld-progress, .ld-tip { animation: none; }
          .ld-bar { transform: scaleY(0.6); }
          .ld-tip:first-child { opacity: 1; }
        }
      `}</style>

      <div className="relative w-84 max-w-full">
        {/* soft glow behind the card */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 rounded-full bg-primary/15 blur-3xl"
        />

        <div
          role="status"
          aria-live="polite"
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-8 text-center shadow-xl backdrop-blur"
        >
          {/* thin highlight along the top edge */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
          />

          {/* logo */}
          <Image
            src="/NotaSick.svg"
            alt="NotaSick logo"
            width={40}
            height={30}
            priority
            className="mx-auto mb-5 h-auto w-10 dark:brightness-0 dark:invert"
          />

          {/* equalizer */}
          <div
            aria-hidden="true"
            className="mx-auto mb-6 flex size-20 items-center justify-center gap-1.5 rounded-2xl border border-border/60 bg-muted/50 px-4 py-4 shadow-inner"
          >
            {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
              <span
                key={i}
                className="ld-bar block h-full w-1.5 origin-center rounded-full bg-primary"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>

          <h2 className="text-lg font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>

          {/* indeterminate progress bar */}
          <div
            aria-hidden="true"
            className="mt-6 h-1 w-full overflow-hidden rounded-full bg-muted"
          >
            <div className="ld-progress h-full w-2/5 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
