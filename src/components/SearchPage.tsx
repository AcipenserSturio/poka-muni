import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import SearchInput from "@/components/SearchInput";
import TableSection from "@/components/TableSection";

const LINK =
  "https://raw.githubusercontent.com/AcipenserSturio/poka-muni/refs/heads/main/public/data.csv"; // Replace with your actual CSV URL

type Row = {
  [key: string]: string;
};

const DIST_VALUES = ["-5", "-4", "-3", "-2", "-1", "1", "2", "3", "4", "5"];

export default function SearchPage() {
  const [data, setData] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Row[]>([]);

  // Load CSV
  useEffect(() => {
    Papa.parse<Row>(LINK, {
      download: true,
      header: true,
      complete: (results) => {
        console.log("Parsed CSV:", results.data);
        setData(results.data);
      },
      error: (err) => {
        console.error("CSV Load Error:", err);
      },
    });
  }, []);

  // Filter by "word"
  useEffect(() => {
    const subset = data.filter(
      (row) => row.first && row.first.toLowerCase() === search.toLowerCase(),
    );
    setFiltered(subset);
  }, [search, data]);

  // Group filtered rows by `dist`
  const grouped: { [key: string]: Row[] } = {};
  for (const value of DIST_VALUES) {
    grouped[value] = [];
  }
  for (const row of filtered) {
    const dist = row.dist;
    if (DIST_VALUES.includes(dist)) {
      grouped[dist].push({ word: row.last, hits: row.hits });
    }
  }

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <SearchInput value={search} onChange={setSearch} />
      {DIST_VALUES.map((dist) => (
        <TableSection key={dist} title={dist} rows={grouped[dist]} />
      ))}
    </main>
  );
}
