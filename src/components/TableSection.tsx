"use client";

import { addUcsur } from "@/utils/ucsur";
import React from "react";

type Row = {
  hits: string;
  word: string;
};

type Props = {
  title: string;
  rows: Row[];
};

const barColour = "#ddd";

export function gradient(proportion: number) {
  let percent = Math.round(proportion * 100);
  return `linear-gradient(
    to right,
    ${barColour} 0%,
    ${barColour} ${percent}%,
    #0000 ${percent}%,
    #0000 100%
  )`;
}

export default function TableSection({ title, rows }: Props) {
  if (rows.length === 0)
    return (
      <section>
        <h2>dist = {title}</h2>
      </section>
    );

  // Total hits for relative bar sizing
  const totalHits = rows.reduce((sum, row) => sum + Number(row.hits || 0), 0);

  return (
    <section>
      <h2>dist = {title}</h2>
      <table>
        <thead>
          <tr>
            {Object.keys(rows[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const hits = Number(row.hits || 0);
            const proportion = totalHits > 0 ? hits / totalHits : 0;

            return (
              <tr key={idx} style={{ background: gradient(proportion) }}>
                <td key={0}>{row.hits}</td>
                <td key={1}>{addUcsur(row.word)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
