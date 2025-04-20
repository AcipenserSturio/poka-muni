"use client";

import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <center>
      <input
        type="text"
        placeholder="Search by word..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </center>
  );
}
