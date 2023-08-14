import { getEquipment } from "@/util/service";
import Image from "next/image";
import * as Models from "@/util/models";

async function Item({equipItem}: {equipItem : Models.Equipment}) {
  return (
    <div className="px-2 py-2 bg-slate-500">
      <Image
        src={"https://img-api.dfoneople.com/df/items/" + equipItem.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
      {`${equipItem.slotName}:     ${equipItem.itemName} `}
    </div>
  );
}

export default async function Equipment({ charId }: { charId: string }) {
  const equip = await getEquipment(charId);
  console.log(equip);

  return (
    <div className="p-5">
      {equip.equipment.map((equip, index) => (
        <Item key={index} equipItem={equip} />
      ))}
    </div>
  );
}
