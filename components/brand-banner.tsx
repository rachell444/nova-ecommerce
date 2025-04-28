export default function BrandBanner() {
  return (
    <section className="bg-muted py-12 md:py-16 lg:py-20">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trusted by Brands Worldwide</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied customers who love our products
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 grayscale">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex h-12 w-32 items-center justify-center">
              <div className="h-8 w-24 rounded-md bg-muted-foreground/20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
