"use client";
import { getEquipment, getItemInfo } from "@/util/service";
import Image from "next/image";
import * as Models from "@/util/models";
import { useEffect, useState } from "react";
import { text } from "stream/consumers";
import { wrap } from "module";
import { isAbsolute } from "path";
import { Accordion } from "flowbite-react";

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

// maps equipment
export default function Equipment({ charId }: { charId: string }) {
  const [equipment, setEquipment] = useState<Models.Equipped>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEquipment = async () => {
    const equipmentResponse = await fetch(`/api/equipment/${charId}`);
    const characterEquipment: Models.Equipped = await equipmentResponse.json();
    setLoading(false);
    setEquipment(characterEquipment);
  };

  useEffect(() => {
    // Runs once on page loadup
    fetchEquipment();
  }, []);
  return (
    <div className="p-5">
      {equipment == undefined ? (
        <div>loading</div>
      ) : (
        <div>
          {equipment.equipment.map((equip, index) => (
            <Item key={index} equipItem={equip} />
          ))}
        </div>
      )}
    </div>
  );
}

// creates a 'card' for each piece of equipment a character is wearing
function Item({ equipItem }: { equipItem: Models.Equipment }) {
  return (
    <div className="text-sm">
      <Accordion collapseAll>
        <Accordion.Panel>
          <Accordion.Title className="bg-[#000000] text-[#c4b6b6] flex">
            <div className="flex-col">
              {equipItem.slotName}
              <AllItemimage itemimage={equipItem} />
              <Upgrade upgrade={equipItem} />
            </div>
            <div style={{ color: rarityColors.get(`${equipItem.itemRarity}`) }}>
              <div>{equipItem.itemName}</div>
              <div>{equipItem.upgradeInfo?.itemName}</div>
            </div>
            <div>
              {equipItem.enchant?.status != undefined &&
                equipItem.enchant?.status.map((status, index) => (
                  <Status key={index} status={status} />
                ))}
              <div>
                {equipItem.enchant?.reinforceSkill != undefined &&
                  equipItem.enchant?.reinforceSkill.map((skill, index) => (
                    <ReinforceSkill key={index} skill={skill} />
                  ))}
              </div>
            </div>
          </Accordion.Title>

          <Accordion.Content className="bg-[#000000]">
            <div className="font-size">
              <div className="grid grid-cols-2 gap-0 px-0 py-0 bg-[#000000] text-red-500 rounded-3xl">
                <div className="border m-0 p-1">
                  <Basic basic={equipItem} />
                </div>
                <div className="border m-1 p-1">
                  <ItemInfo itemInfo={equipItem} />
                  <br></br>
                  <FusionCheck fusionCheck={equipItem} />
                </div>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}
// returns both base and fusion equipment images
function AllItemimage({ itemimage }: { itemimage: Models.Equipment }) {
  return (
    <div className="flex">
      <div className="equipmentImageContainer m-1 p-1 flex">
        <div>
          <BaseItemImage baseitemimage={itemimage} />
        </div>
      </div>
      <div className="equipmentImageContainer m-1 p-1 flex">
        <div>
          <FusionImage fusionimage={itemimage} />
        </div>
      </div>
    </div>
  );
}
// returns image of base equipment
function BaseItemImage({ baseitemimage }: { baseitemimage: Models.Equipment }) {
  return (
    <div className="flex-shrink-0 m-1">
      <Image
        style={{
          border: `1px outset ${rarityColors.get(baseitemimage.itemRarity)}`,
        }}
        src={"https://img-api.dfoneople.com/df/items/" + baseitemimage.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
    </div>
  );
}
// returns image of fusion equipment
function FusionImage({ fusionimage }: { fusionimage: Models.Equipment }) {
  return (
    <div className=" flex-shrink-0 m-1">
      {fusionimage.upgradeInfo?.itemId != undefined && (
        <Image
          style={{
            border: `1px outset ${rarityColors.get(fusionimage.itemRarity)}`,
          }}
          src={
            "https://img-api.dfoneople.com/df/items/" +
            fusionimage.upgradeInfo?.itemId
          }
          width={28}
          height={28}
          unoptimized={true}
          alt="item image"
        />
      )}
    </div>
  );
}
// returns html displaying basic gear information
function Basic({ basic }: { basic: Models.Equipment }) {
  return (
    <div>
      <div className="flex">
        <div>
          <BaseItemImage baseitemimage={basic} />
        </div>
        <div>
          <div
            style={{
              color: rarityColors.get(`${basic.itemRarity}`),
            }}
          >
            {`•${basic.itemRarity} ${basic.itemTypeDetail}`}
          </div>
          <div
            style={{
              color: rarityColors.get(`${basic.itemRarity}`),
            }}
          >
            {`•${basic.itemName}`}
          </div>
        </div>
      </div>

      <div>
        <Upgrade upgrade={basic} />
      </div>
      <br></br>
      <div>
        {basic.growInfo?.total != undefined && (
          <Total total={basic.growInfo.total} />
        )}
        {basic.growInfo?.options.map((opt, index) => (
          <Options key={index} option={opt} />
        ))}
      </div>
      <br></br>

      <div className="text-[#00dc00]">
        {basic.enchant != undefined && `Enchants:`}
      </div>
      {basic.enchant?.status != undefined &&
        basic.enchant?.status.map((status, index) => (
          <Status key={index} status={status} />
        ))}
      {basic.enchant?.reinforceSkill != undefined &&
        basic.enchant?.reinforceSkill.map((skill, index) => (
          <ReinforceSkill key={index} skill={skill} />
        ))}
      <div>
        <br></br>
      </div>
    </div>
  );
}
// basic 105 gear options
function Options({ option }: { option: Models.Option }) {
  const damage = option.damage;
  return (
    <div className="border m-0.5 p-1">
      <div>
        <h1 className="text-white">{`Level: ${option.level}`}</h1>
      </div>
      <div>
        {`Damage Value:`}
        <span className="text-blue">{`${damage} `}</span>
        {`Buff: ${option.buff}`}
      </div>
      <div>{`${option.explainDetail}`}</div>
    </div>
  );
}
//ispin fusion
function Ispins({ ispins }: { ispins: Models.Ispins }) {
  return (
    <div>
      <div>Ispins Fusion Effects:</div>
      {`${ispins.explainDetail}`}
    </div>
  );
}
// bakal fusion
function Machine({ machine }: { machine: Models.Machine }) {
  return (
    <div>
      <div>Bakal Fusion Effects:</div>
      {`${machine.explainDetail}`}
    </div>
  );
}
// dimension fusion
function Hall({ hall }: { hall: Models.Hall }) {
  return (
    <div>
      <div>Hall of Dimensions Fusion Effects:</div>
      {`${hall.explainDetail}`}
    </div>
  );
}
// bakal weapon fusion
function Bakal({ bakal }: { bakal: Models.Bakal }) {
  return <div>{`${bakal.explainDetail}`}</div>;
}
// enchants
function Status({ status }: { status: Models.Status }) {
  return (
    <div className="text-[#90ff90]">
      {`${status.name} `}
      {`${status.value} `}
    </div>
  );
}
// enchants for skill buffs
function ReinforceSkill({ skill }: { skill: Models.ReinforceSkill }) {
  return (
    <div className="text-[#90ff90]">
      {skill.skills != undefined &&
        skill.skills.map((encSkill, index) => (
          <div key={index}>
            {encSkill.name} + {encSkill.value}{" "}
          </div>
        ))}
    </div>
  );
}
// returns the reinforcement or amplification of an item
function Upgrade({ upgrade }: { upgrade: Models.Equipment }) {
  var color = "#0096FF";
  if (upgrade.amplificationName != undefined) {
    color = "#FC0FC0";
  }
  if (upgrade.refine != 0) {
    return (
      <div style={{ color: `${color}` }}>
        {upgrade.reinforce != 0 && `+${upgrade.reinforce}/`}
        <span className="text-[#800080]">{`${upgrade.refine} `}</span>
        {upgrade.amplificationName != undefined &&
          `${upgrade.amplificationName}`}
      </div>
    );
  }
  return (
    <div
      style={{
        color: `${color}`,
      }}
    >
      {upgrade.reinforce != 0 && `+${upgrade.reinforce} `}
      {upgrade.amplificationName != undefined && `${upgrade.amplificationName}`}
    </div>
  );
}
// gets info on fusion equipment
function Fusion({ fusion }: { fusion: Models.Equipment }) {
  return (
    <div>
      {fusion.ispinsInfo != undefined &&
        fusion.ispinsInfo?.options.map((ispins, index) => (
          <Ispins key={index} ispins={ispins} />
        ))}
      {fusion.machineRevolutionInfo != undefined &&
        fusion.machineRevolutionInfo?.options.map((machine, index) => (
          <Machine key={index} machine={machine} />
        ))}
      {fusion.dimensionCloisterInfo != undefined &&
        fusion.dimensionCloisterInfo?.options.map((hall, index) => (
          <Hall key={index} hall={hall} />
        ))}
      {fusion.bakalInfo != undefined && <div>Bakal Weapon Fusion Effects:</div>}
      {fusion.bakalInfo != undefined &&
        fusion.bakalInfo?.options.map((bakal, index) => (
          <Bakal key={index} bakal={bakal} />
        ))}
    </div>
  );
}
// basic information for 105 epic gear
function Total({ total }: { total: Models.Total }) {
  return (
    <div>
      Total Option Level: {total.level}
      <br></br>
      Total Damage Value: {total.damage}
      <br></br>
      Total Buff Value: {total.buff}
      <br></br>
      <br></br>
      Option Effects:
    </div>
  );
}
// returns general item info, applicable to nearly all items
function ItemInfo({ itemInfo }: { itemInfo: Models.Equipment }) {
  const [item, setItemInfo] = useState<Models.ItemInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchItemInfo = async () => {
    const itemInfoResponse = await fetch(`/api/item/${itemInfo.itemId}`);
    const itemInfos: Models.ItemInfo = await itemInfoResponse.json();
    setLoading(false);
    setItemInfo(itemInfos);
  };

  useEffect(() => {
    // Runs once on page loadup
    fetchItemInfo();
  }, []);
  return (
    <div>
      {item == undefined ? (
        <div>loading</div>
      ) : (
        <div>
          {item.itemStatus.map((equip, index) => (
            <ItemStatu key={index} itemStatu={equip} />
          ))}
          <div>{`${item.itemExplainDetail}`}</div>
        </div>
      )}
    </div>
  );
}
// returns specific general item info
function ItemStatu({ itemStatu }: { itemStatu: Models.ItemStatu }) {
  if (
    itemStatu.name !== "Durability" &&
    itemStatu.name !== "Adventurer Fame" &&
    itemStatu.name !== "Attack attribute"
  ) {
    return <div>{`${itemStatu.name}: ${itemStatu.value}`}</div>;
  }
}

// checks if a piece has a fusion and returns information on the fusion equipment
function FusionCheck({ fusionCheck }: { fusionCheck: Models.Equipment }) {
  if (fusionCheck.upgradeInfo != undefined) {
    return (
      <div>
        <div className="flex justify-start align-baseline">
          <div className="flex basis-auto">
            <FusionImage fusionimage={fusionCheck} />
          </div>
          <div className="flex text-[#FFB400]">
            {`•${fusionCheck.upgradeInfo.itemName}`}
          </div>
        </div>
        <Fusion fusion={fusionCheck} />
      </div>
    );
  } else if (fusionCheck.itemTypeDetail == "Title") {
    return (
      <div>
        Some title images may be broken at this time. Other information should
        be accurate
      </div>
    );
  } else {
    return <div>This equipment currently has no Fusion</div>;
  }
}
