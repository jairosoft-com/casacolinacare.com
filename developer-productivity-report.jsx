import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const COLORS = {
  teal: "#0D7377",
  coral: "#E07A5F",
  sand: "#F5E6D3",
  charcoal: "#1A1A2E",
  ivory: "#FAFAF7",
  blue: "#4A90D9",
  green: "#27AE60",
  purple: "#8E44AD",
  orange: "#F39C12",
  lightTeal: "#0D737722",
};

const dailyCommits = [
  { date: "Feb 9", day: "Mon", commits: 1 },
  { date: "Feb 10", day: "Tue", commits: 17 },
  { date: "Feb 11", day: "Wed", commits: 6 },
  { date: "Feb 12", day: "Thu", commits: 31 },
  { date: "Feb 13", day: "Fri", commits: 5 },
  { date: "Feb 14", day: "Sat", commits: 4 },
  { date: "Feb 15", day: "Sun", commits: 0 },
  { date: "Feb 16", day: "Mon", commits: 5 },
  { date: "Feb 17", day: "Tue", commits: 5 },
  { date: "Feb 18", day: "Wed", commits: 0 },
  { date: "Feb 19", day: "Thu", commits: 4 },
  { date: "Feb 20", day: "Fri", commits: 6 },
  { date: "Feb 21", day: "Sat", commits: 2 },
];

const commitTypes = [
  { name: "feat", value: 25, color: COLORS.teal },
  { name: "docs", value: 24, color: COLORS.blue },
  { name: "chore", value: 12, color: COLORS.orange },
  { name: "merge", value: 17, color: COLORS.sand },
  { name: "fix", value: 2, color: COLORS.coral },
  { name: "refactor", value: 1, color: COLORS.purple },
  { name: "other", value: 5, color: "#ccc" },
];

const hourlyActivity = [
  { hour: "9am", commits: 1 },
  { hour: "10am", commits: 4 },
  { hour: "11am", commits: 9 },
  { hour: "12pm", commits: 4 },
  { hour: "1pm", commits: 7 },
  { hour: "2pm", commits: 1 },
  { hour: "3pm", commits: 2 },
  { hour: "4pm", commits: 1 },
  { hour: "5pm", commits: 1 },
  { hour: "6pm", commits: 7 },
  { hour: "7pm", commits: 0 },
  { hour: "8pm", commits: 8 },
  { hour: "9pm", commits: 2 },
  { hour: "10pm", commits: 29 },
  { hour: "11pm", commits: 3 },
  { hour: "12am", commits: 4 },
  { hour: "1am", commits: 3 },
];

const dayOfWeek = [
  { day: "Mon", commits: 6 },
  { day: "Tue", commits: 22 },
  { day: "Wed", commits: 6 },
  { day: "Thu", commits: 35 },
  { day: "Fri", commits: 11 },
  { day: "Sat", commits: 6 },
  { day: "Sun", commits: 0 },
];

const weeklyTrend = [
  { week: "Week 7\n(Feb 9–15)", commits: 64, lines: 18200 },
  { week: "Week 8\n(Feb 16–21)", commits: 22, lines: 4887 },
];

const topFiles = [
  { file: "progress.txt", touches: 14 },
  { file: "prd.json", touches: 13 },
  { file: "prd.json (004)", touches: 7 },
  { file: "AGENTS.md", touches: 7 },
  { file: "layout.tsx", touches: 6 },
  { file: "prd-enhanced.md", touches: 6 },
  { file: "progress (004)", touches: 5 },
  { file: ".gitignore", touches: 5 },
];

const prsMerged = [
  { pr: "US-001 Header", date: "Feb 10" },
  { pr: "US-002 Footer", date: "Feb 10" },
  { pr: "US-003 Layout", date: "Feb 10" },
  { pr: "US-004 Hero", date: "Feb 10" },
  { pr: "US-005 Intro", date: "Feb 10" },
  { pr: "US-006 Testimonial", date: "Feb 10" },
  { pr: "US-007 About", date: "Feb 12" },
  { pr: "US-008 FAQ", date: "Feb 12" },
  { pr: "US-009 Contact Form", date: "Feb 12" },
  { pr: "US-010 Contact Page", date: "Feb 12" },
  { pr: "US-011 Contact API", date: "Feb 12" },
  { pr: "US-012 SEO", date: "Feb 12" },
  { pr: "US-001 Schema", date: "Feb 13" },
  { pr: "CVE Fix (Vercel)", date: "Feb 13" },
  { pr: "#17 FAQ Update", date: "Feb 17" },
  { pr: "#18 LLM Context", date: "Feb 17" },
];

function StatCard({ label, value, sub, accent = false }) {
  return (
    <div
      style={{
        background: accent ? COLORS.teal : "white",
        color: accent ? "white" : COLORS.charcoal,
        borderRadius: 12,
        padding: "20px 24px",
        flex: "1 1 200px",
        minWidth: 180,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        border: accent ? "none" : "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 4, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "white", border: "1px solid #e5e7eb", borderRadius: 8,
        padding: "8px 12px", fontSize: 13, boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color || COLORS.teal }}>
            {p.name}: {p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ProductivityDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity Patterns" },
    { id: "work", label: "Work Breakdown" },
    { id: "prs", label: "Pull Requests" },
  ];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: "#f8f9fa",
      minHeight: "100vh",
      padding: "32px 24px",
      color: COLORS.charcoal,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, color: COLORS.teal, marginBottom: 4 }}>
            casacolinacare.com
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px 0" }}>
            Developer Productivity Report
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
            Jan 26 – Feb 25, 2026 · Last 30 days
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
          <StatCard label="Total Commits" value="86" sub="by Ramon Aseniero" accent />
          <StatCard label="Lines Added" value="+23,087" sub="-6,832 removed" />
          <StatCard label="Active Days" value="11" sub="of 30 calendar days" />
          <StatCard label="PRs Merged" value="16" sub="US-001 through US-012+" />
          <StatCard label="Files Touched" value="251" sub="file changes total" />
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 24, background: "white",
          borderRadius: 10, padding: 4, border: "1px solid #e5e7eb", width: "fit-content"
        }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 500, transition: "all 0.15s",
                background: activeTab === t.id ? COLORS.teal : "transparent",
                color: activeTab === t.id ? "white" : "#6b7280",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Daily Commits */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px 0" }}>Daily Commit Activity</h3>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 16px 0" }}>Commits per day over the last 30 days</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dailyCommits} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="commits" fill={COLORS.teal} radius={[4, 4, 0, 0]} name="Commits" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Comparison */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", flex: "1 1 300px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px 0" }}>Weekly Comparison</h3>
                <div style={{ display: "flex", gap: 16 }}>
                  {weeklyTrend.map((w, i) => (
                    <div key={i} style={{
                      flex: 1, background: i === 0 ? `${COLORS.teal}11` : "#f9fafb",
                      borderRadius: 10, padding: 20, textAlign: "center",
                      border: i === 0 ? `2px solid ${COLORS.teal}33` : "1px solid #e5e7eb"
                    }}>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8, fontWeight: 500 }}>
                        {i === 0 ? "Week 7 (Feb 9–15)" : "Week 8 (Feb 16–21)"}
                      </div>
                      <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.teal }}>{w.commits}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>commits</div>
                      {i === 0 && (
                        <div style={{
                          marginTop: 8, fontSize: 11, fontWeight: 600,
                          color: COLORS.teal, background: `${COLORS.teal}15`,
                          borderRadius: 20, padding: "3px 10px", display: "inline-block"
                        }}>
                          Sprint week
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", flex: "1 1 300px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px 0" }}>Commit Types</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={commitTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {commitTypes.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(val) => <span style={{ fontSize: 11, color: "#6b7280" }}>{val}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Activity Patterns Tab */}
        {activeTab === "activity" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px 0" }}>Commits by Hour of Day</h3>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 16px 0" }}>Peak productivity at 10 PM with 29 commits</p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={hourlyActivity}>
                  <defs>
                    <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.teal} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={COLORS.teal} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="commits" stroke={COLORS.teal} fill="url(#tealGrad)" strokeWidth={2} name="Commits" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", flex: "1 1 400px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px 0" }}>Commits by Day of Week</h3>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 16px 0" }}>Thursday is the most productive day</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={dayOfWeek} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="commits" radius={[6, 6, 0, 0]} name="Commits">
                      {dayOfWeek.map((entry, i) => (
                        <Cell key={i} fill={entry.commits === 35 ? COLORS.coral : COLORS.teal} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", flex: "1 1 280px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px 0" }}>Work Style Insights</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { icon: "🌙", label: "Night owl", desc: "66% of commits after 6 PM" },
                    { icon: "🔥", label: "Sprint-driven", desc: "Week 7 had 3x more commits than Week 8" },
                    { icon: "📅", label: "Thu & Tue focused", desc: "57 of 86 commits on those two days" },
                    { icon: "📝", label: "Doc-heavy", desc: "28% of commits are documentation" },
                    { icon: "🔄", label: "PR-disciplined", desc: "16 PRs merged with feature branches" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Work Breakdown Tab */}
        {activeTab === "work" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px 0" }}>Most Touched Files</h3>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 16px 0" }}>Files with the highest number of modifications</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topFiles} layout="vertical" barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="file" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="touches" fill={COLORS.blue} radius={[0, 4, 4, 0]} name="Touches" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", flex: "1 1 300px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px 0" }}>Code Volume</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13 }}>Lines added</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.green }}>+23,087</span>
                    </div>
                    <div style={{ height: 8, background: "#f0f0f0", borderRadius: 4 }}>
                      <div style={{ height: 8, background: COLORS.green, borderRadius: 4, width: "100%" }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13 }}>Lines removed</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.coral }}>-6,832</span>
                    </div>
                    <div style={{ height: 8, background: "#f0f0f0", borderRadius: 4 }}>
                      <div style={{ height: 8, background: COLORS.coral, borderRadius: 4, width: "30%" }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13 }}>Net change</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.teal }}>+16,255</span>
                    </div>
                    <div style={{ height: 8, background: "#f0f0f0", borderRadius: 4 }}>
                      <div style={{ height: 8, background: COLORS.teal, borderRadius: 4, width: "70%" }} />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 20, padding: 14, background: "#f9fafb", borderRadius: 8, fontSize: 12, color: "#6b7280" }}>
                  <strong>Avg per commit:</strong> ~268 lines added, ~79 removed
                  <br />
                  <strong>Avg per active day:</strong> ~7.8 commits, ~2,099 lines
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", flex: "1 1 300px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px 0" }}>Merge vs Direct</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Direct commits", value: 69 },
                        { name: "Merge commits", value: 17 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      <Cell fill={COLORS.teal} />
                      <Cell fill={COLORS.orange} />
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" iconSize={8}
                      formatter={(val) => <span style={{ fontSize: 11, color: "#6b7280" }}>{val}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* PRs Tab */}
        {activeTab === "prs" && (
          <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px 0" }}>Pull Requests Merged (16)</h3>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 16px 0" }}>All user stories shipped via feature branches</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
              {prsMerged.map((pr, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", background: "#f9fafb", borderRadius: 8,
                    border: "1px solid #f0f0f0", transition: "all 0.15s",
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: pr.pr.includes("CVE") ? COLORS.coral : COLORS.teal,
                    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                  }}>
                    {pr.pr.includes("CVE") ? "!" : "✓"}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{pr.pr}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{pr.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 20, padding: 16, background: `${COLORS.teal}08`,
              borderRadius: 10, border: `1px solid ${COLORS.teal}20`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.teal, marginBottom: 6 }}>
                Delivery Summary
              </div>
              <div style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6 }}>
                Shipped the entire site in two weeks — from scaffolding (header, footer, layout) through all core pages
                (home, about, FAQ, contact) to backend (contact API, email integration) and SEO.
                Feature branches with PR reviews followed throughout.
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, fontSize: 11, color: "#9ca3af" }}>
          Generated Feb 25, 2026 · casacolinacare.com · github.com/jairosoft-com/casacolinacare.com
        </div>
      </div>
    </div>
  );
}
