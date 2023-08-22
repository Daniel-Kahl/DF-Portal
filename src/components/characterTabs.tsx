"use client";

import { Tabs } from "flowbite-react";
import Equipment from "./equipment";
import Insignia from "./insignia";
import React from "react";

export default function CharacterTabs({
  charId,
  stats,
}: {
  charId: string;
  stats: React.ReactNode;
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
        <Tabs.Item title="insignia">
          <Insignia charId={charId} />
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
}
