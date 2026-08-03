import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: ReactNode;
  valueClassName?: string;
};

function StatCard({
  title,
  value,
  icon,
  valueClassName = "text-slate-900",
}: StatCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${valueClassName}`}
          >
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl transition group-hover:scale-110">
          {icon}
        </div>
      </div>
    </article>
  );
}

export default StatCard;