import * as Models from "@/util/models";
import { getBuffEquip } from "@/util/service";
import Image from "next/image";

export default async function BuffSwap({ charId }: { charId: string }) {
  const buff = await getBuffEquip(charId);
  if (buff.skill != undefined) {
    return (
      <div>
        Level {buff.skill.buff.skillInfo.option.level}{" "}
        {buff.skill.buff.skillInfo.name}
        <div></div>
        {buff.skill.buff.skillInfo.option.values[1]}% more damage
      </div>
    );
  }
}
