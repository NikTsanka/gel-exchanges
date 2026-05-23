"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

const PERIODS = [
  { label: "7 დღე", days: 7 },
  { label: "30 დღე", days: 30 },
  { label: "90 დღე", days: 90 },
  { label: "1 წელი", days: 365 },
];

interface DataPoint {
  date: string;
  rate: number;
}

interface Props {
  code: string;
}

export function HistoryChart({ code }: Props) {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/history?code=${code}&days=${days}`)
      .then((r) => r.json())
      .then((d) => { setData(d ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [code, days]);

  const min = data.length ? Math.min(...data.map((d) => d.rate)) : 0;
  const max = data.length ? Math.max(...data.map((d) => d.rate)) : 0;
  const avg = data.length ? data.reduce((s, d) => s + d.rate, 0) / data.length : 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {PERIODS.map((p) => (
          <Button
            key={p.days}
            variant={days === p.days ? "default" : "outline"}
            size="sm"
            onClick={() => setDays(p.days)}
          >
            {p.label}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          იტვირთება...
        </div>
      ) : data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          მონაცემები არ არის
        </div>
      ) : (
        <>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => v.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  domain={["auto", "auto"]}
                  tickFormatter={(v) => v.toFixed(4)}
                />
                <Tooltip
                  formatter={(v) => [typeof v === "number" ? `${v.toFixed(4)} ₾` : String(v), "კურსი"]}
                  labelFormatter={(l) => `თარიღი: ${l}`}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#0066FF"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">მინიმალური</p>
              <p className="font-mono font-semibold">{min.toFixed(4)}</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">საშუალო</p>
              <p className="font-mono font-semibold">{avg.toFixed(4)}</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">მაქსიმალური</p>
              <p className="font-mono font-semibold">{max.toFixed(4)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
