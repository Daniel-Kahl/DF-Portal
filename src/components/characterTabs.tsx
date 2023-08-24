"use client";

import { Tabs } from "flowbite-react";
import Equipment from "./equipment";
import React from "react";

export default function CharacterTabs({
  charId,
  stats,
  insignia,
}: {
  charId: string;
  stats: React.ReactNode;
  insignia: React.ReactNode;
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
        <Tabs.Item title="other">
          <p>test</p>
        </Tabs.Item>
        <Tabs.Item active title="insignia">
          {insignia}
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
}
