import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <section>
        <p className="text-sm font-semibold text-[#9b333b]">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Settings
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Configure student management portal preferences.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">

        {/* GENERAL SETTINGS */}
        <section className="rounded-2xl border border-[#ded6ca] bg-white p-6 shadow-sm xl:col-span-2">

          <div className="border-b border-[#eee7dc] pb-5">

            <h2 className="text-lg font-bold text-[#332c28]">
              General Settings
            </h2>

            <p className="mt-1 text-sm text-[#918478]">
              Basic information about your academic portal.
            </p>

          </div>

          <div className="mt-6 space-y-5">

            {/* COLLEGE NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                Institution Name
              </label>

              <input
                type="text"
                defaultValue="Vivekanand Education Society's Institute of Technology"
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              />
            </div>

            {/* ACADEMIC YEAR */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                Academic Year
              </label>

              <select
                defaultValue="2025-26"
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option value="2025-26">
                  2025–26
                </option>

                <option value="2026-27">
                  2026–27
                </option>

                <option value="2027-28">
                  2027–28
                </option>
              </select>
            </div>

            {/* ADMIN EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                Administrator Email
              </label>

              <input
                type="email"
                defaultValue="admin@college.edu"
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              />
            </div>

          </div>

          <button className="mt-6 rounded-xl bg-[#4b171b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#641f25]">
            Save Changes
          </button>

        </section>

        {/* SYSTEM INFO */}
        <section className="rounded-2xl bg-[#4b171b] p-6 text-[#f8f1e5]">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a66b]">
            System
          </p>

          <h2 className="mt-3 text-xl font-bold">
            Portal Information
          </h2>

          <div className="mt-6 space-y-4">

            <SystemInfo
              label="Portal"
              value="Student Management"
            />

            <SystemInfo
              label="Version"
              value="1.0.0"
            />

            <SystemInfo
              label="Academic Year"
              value="2025–26"
            />

            <SystemInfo
              label="Status"
              value="Operational"
            />

          </div>

        </section>

      </div>

      {/* PREFERENCES */}
      <section className="rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        <div className="border-b border-[#eee7dc] p-6">

          <h2 className="text-lg font-bold text-[#332c28]">
            Preferences
          </h2>

          <p className="mt-1 text-sm text-[#918478]">
            Manage portal notifications and data preferences.
          </p>

        </div>

        <div className="divide-y divide-[#eee7dc]">

          <SettingRow
            title="System Notifications"
            description="Receive notifications about important student record changes."
            enabled={notifications}
            setEnabled={setNotifications}
          />

          <SettingRow
            title="Email Alerts"
            description="Receive important academic administration alerts by email."
            enabled={emailAlerts}
            setEnabled={setEmailAlerts}
          />

          <SettingRow
            title="Automatic Save"
            description="Automatically save changes made to student records."
            enabled={autoSave}
            setEnabled={setAutoSave}
          />

        </div>

      </section>

    </div>
  );
}


/* SYSTEM INFO */

function SystemInfo({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-[#6b282d] pb-3">

      <span className="text-sm text-[#ddcfc0]">
        {label}
      </span>

      <span className="text-sm font-semibold">
        {value}
      </span>

    </div>
  );
}


/* SETTING ROW */

function SettingRow({
  title,
  description,
  enabled,
  setEnabled,
}) {
  return (
    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <h3 className="font-semibold text-[#332c28]">
          {title}
        </h3>

        <p className="mt-1 max-w-2xl text-sm text-[#918478]">
          {description}
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled
            ? "bg-[#4b171b]"
            : "bg-[#d5cec4]"
        }`}
      >

        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}

export default Settings;