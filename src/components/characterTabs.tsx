"use client";

import { Tabs } from "flowbite-react";
import Equipment from "./equipment";
import React from "react";
import Talismans from "./talisman";

export default function CharacterTabs({
  charId,
  stats
}: {
    charId: string;
    stats: React.ReactNode;
}) {
  return (
    <>
      <Tabs.Group aria-label="Default tabs" style="default">
        <Tabs.Item active title="stats">
          {stats}
        </Tabs.Item>
        <Tabs.Item title="equipment">
          <Equipment charId={charId}/>
        </Tabs.Item>
        <Tabs.Item title="talismans">
          <Talismans charId={charId}></Talismans>  
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
}
