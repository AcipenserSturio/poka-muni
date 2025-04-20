"use client";

import React from "react";

type Row = {
  [key: string]: string;
};

type Props = {
  title: string;
  rows: Row[];
};

export default function TableSection({ title, rows }: Props) {
  if (rows.length === 0) return null;

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
          {rows.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
