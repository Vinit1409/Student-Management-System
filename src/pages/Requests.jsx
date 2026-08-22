function Requests() {
  return (
    <div className="space-y-6">

      <section>
        <p className="text-sm font-semibold text-[#9b333b]">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Student Requests
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Manage academic and administrative requests.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-3">

        <RequestCard
          icon="📄"
          title="Transcript"
          text="Request academic transcript"
        />

        <RequestCard
          icon="🏖️"
          title="Leave Application"
          text="Submit and manage leave requests"
        />

        <RequestCard
          icon="📚"
          title="Course Drop"
          text="Manage course drop requests"
        />

      </div>

    </div>
  );
}

function RequestCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="text-3xl">
        {icon}
      </div>

      <h2 className="mt-4 font-bold text-[#332c28]">
        {title}
      </h2>

      <p className="mt-2 text-sm text-[#918478]">
        {text}
      </p>

      <button className="mt-5 rounded-xl border border-[#ddd3c6] px-4 py-2 text-sm font-semibold text-[#62564d] hover:bg-[#f5eee5]">
        Open Request
      </button>

    </div>
  );
}

export default Requests;