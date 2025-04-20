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

export default function TableSection({ title, rows }: Props) {
  if (rows.length === 0)
    return (
      <section>
        <h2>dist = {title}</h2>
      </section>
    );

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
              <td key={0}>{row.hits}</td>
              <td key={1}>{addUcsur(row.word)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
