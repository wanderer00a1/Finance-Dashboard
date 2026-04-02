import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../context/AppContext";
import { getMonthlyTotals } from "../utils/helpers";
import styles from "./TrendChart.module.css";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((p) => (
        <p
          key={p.name}
          style={{ color: p.color, fontSize: 12, margin: "2px 0" }}
        >
          {p.name}: ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function TrendChart() {
  const { transactions } = useApp();
  const data = getMonthlyTotals(transactions);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>Income vs Expenses</div>
        <div className={styles.sub}>Monthly breakdown</div>
      </div>

      {data.length === 0 ? (
        <p className={styles.empty}>No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart
            data={data}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                `$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#16a34a"
              fillOpacity={0.8}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#dc2626"
              fillOpacity={0.8}
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
