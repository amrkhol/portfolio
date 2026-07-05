export default function TechTag({ name }: { name: string }) {
  return (
    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50">
      {name}
    </span>
  );
}
