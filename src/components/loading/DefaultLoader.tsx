'use client';

import { Puff } from "react-loader-spinner";

export function DefaultLoader() {
  return (
    <Puff
      color="#00BFFF"
      height={100}
      width={100}
    />
  );
}