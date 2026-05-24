export default function PlaceholderScreen({ title, description }) {
  return (
    <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="font-display text-[2rem] leading-tight text-text">
          {title}
        </h1>
        <p className="mt-3 max-w-[280px] text-[0.9rem] leading-relaxed text-muted">
          {description}
        </p>
      </section>
    </div>
  );
}
