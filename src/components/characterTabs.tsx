"use client";

import { Tabs } from "flowbite-react";
import Equipment from "./equipment";
import React from "react";

export default function CharacterTabs({
  charId,
  stats,
  insignia,
  avatar,
  buffswap,
}: {
  charId: string;
  stats: React.ReactNode;
  insignia: React.ReactNode;
  avatar: React.ReactNode;
  buffswap: React.ReactNode;
}) {
  return (
    <>
      <Tabs.Group aria-label="Defatult tabs" style="default">
        <Tabs.Item active title="stats">
          {stats}
        </Tabs.Item>
        <Tabs.Item title="equipment">
          <Equipment charId={charId} />
        </Tabs.Item>
        <Tabs.Item active title="insignia">
          {insignia}
        </Tabs.Item>
        <Tabs.Item active title="avatar">
          {avatar}
        </Tabs.Item>
        <Tabs.Item active title="buffswap">
          {buffswap}
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
}
