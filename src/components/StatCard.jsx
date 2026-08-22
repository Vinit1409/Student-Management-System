function StatCard({
  title,
  value,
  description,
  symbol,
  symbolClass,
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#85776b]">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#292321]">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${symbolClass}`}
        >
          {symbol}
        </div>
      </div>

      <p className="mt-4 text-xs text-[#9a8d80]">
        {description}
      </p>
    </div>
  );
}

export default StatCard;