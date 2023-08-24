import * as Models from "@/util/models";
import { getInsignia } from "@/util/service";
import Image from "next/image";

const rarityColors = new Map<string, string>([
  ["Common", "#FFFFFF"],
  ["Uncommon", "#68D5ED"],
  ["Rare", "#B36BFF"],
  ["Unique", "#FF00FF"],
  ["Epic", "#FFB400"],
  ["Chronicle", "#FF6666"],
  ["Legendary", "#FF7800"],
  ["Mythic", "#FFB400"],
]);

export default async function Insignia({ charId }: { charId: string }) {
  const insignia = await getInsignia(charId);

  return (
    <div style={{ color: rarityColors.get(`${insignia.flag.itemRarity}`) }}>
      <FlagImage equipFlag={insignia.flag} />
      {" +"}
      {insignia.flag.reinforce} {insignia.flag.itemName},{" "}
      {insignia.flag.itemAbility}
      {insignia.flag.gems.map((insignia, index) => (
        <Gem key={index} equipGem={insignia} />
      ))}
    </div>
  );
}

function Gem({ equipGem }: { equipGem: Models.Gem }) {
  return (
    <div style={{ color: rarityColors.get(`${equipGem.itemRarity}`) }}>
      <GemImage equipGem={equipGem} />
      {equipGem.itemName}, {equipGem.itemAbility}
    </div>
  );
}

function GemImage({ equipGem }: { equipGem: Models.Gem }) {
  return (
    <div className="flex-shrink-0 m-1">
      <Image
        style={{
          border: `1px outset ${rarityColors.get(equipGem.itemRarity)}`,
        }}
        src={"https://img-api.dfoneople.com/df/items/" + equipGem.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
    </div>
  );
}

function FlagImage({ equipFlag }: { equipFlag: Models.Flag }) {
  return (
    <div className="flex-shrink-0 m-1">
      <Image
        style={{
          border: `1px outset ${rarityColors.get(equipFlag.itemRarity)}`,
        }}
        src={"https://img-api.dfoneople.com/df/items/" + equipFlag.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
    </div>
  );
}
