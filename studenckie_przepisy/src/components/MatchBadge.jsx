function MatchBadge({ matched, total, hasAll, isIngredientsFilterUsed }) {
  if (hasAll) {
    return (
      <span className="inline-flex items-center gap-1 bg-accent/20 text-accent-text text-[0.72rem] font-semibold px-2.5 py-0.5 rounded-full">
        <span className="text-accent">✓</span> Masz wszystko!
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-surface2 text-muted text-[0.72rem] font-medium px-2.5 py-0.5 rounded-full">
      {isIngredientsFilterUsed ? 
        `Masz ${matched}/${total} składników` :
        `Potrzebne ${total} składników`
      }
    </span>
  );
}

export default MatchBadge