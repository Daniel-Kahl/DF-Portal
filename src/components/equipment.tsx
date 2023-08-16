import { getEquipment, getItemInfo } from "@/util/service";
import Image from "next/image";
import * as Models from "@/util/models";
import { text } from "stream/consumers";
import { wrap } from "module";
import { isAbsolute } from "path";

async function Options({option}: {option: Models.Option}) {
// basic 105 gear options
  const damage = option.damage
  return (
    <div className = 'border m-0.5 p-1'>
      <div>
      <h1 style= {{color: 'white'}} >{`Level: ${option.level}`}</h1>
      </div>
      <div>
      {`Damage Value:`}
      <span style ={{color: 'blue'}}>{`${damage} `}</span>
      {`Buff: ${option.buff}`}
      </div>
      <div>
      {`${option.explainDetail}`}
      </div>
    </div>

  )
}

async function Option3({option3}: {option3: Models.Option3}) {
//ispin fusion
  return (
    <div>
      <div>
        Ispins Fusion Effects:
      </div>
      {`${option3.explainDetail}`}
    </div>
  )
}
async function Option2({option2}: {option2: Models.Option2}) {
// bakal fusion
  return (
    <div>
      <div>
        Bakal Fusion Effects:
      </div>
      {`${option2.explainDetail}`}
    </div>
  )
}
async function Option4({option4}: {option4: Models.Option4}) {
// dimension fusion
  return (
    <div>
      <div>
        Hall of Dimensions Fusion Effects:
      </div>
      {`${option4.explainDetail}`}      
    </div>
  )
}

async function Option5({option5}: {option5: Models.Option5}) {
  // bakal weapon fusion
    return (
      <div>
        {`${option5.explainDetail}`}      
      </div>
    )
  }

async function Status({status}: {status: Models.Status}) {
// enchants
  return (
    <div style = {{
      color: `#90ff90`
      }}>
      {`${status.name} `}
      {`${status.value} `}
    </div>
  )
}

async function FusionImage({fusionimage}: {fusionimage: Models.Equipment}) {
  // returns image of fusion equipment
  const rarityColors = new Map<string, string>([
    ["Common",     "#FFFFFF"],
    ["Uncommon",   "#68D5ED"],
    ["Rare",     "#B36BFF"],
    ["Unique",     "#FF00FF"],
    ["Epic", "#FFB400"],
    ["Chronicle", "#FF6666"],
    ["Legendary", "#FF7800"],
    ["Mythic", "#FFB400"],
  ]);
  return (
    <div style ={{
    }}>
    {fusionimage.upgradeInfo?.itemId != undefined &&
      <Image style = {{
        border: `1px outset ${rarityColors.get(fusionimage.itemRarity)}`,
      }}
        src={"https://img-api.dfoneople.com/df/items/" + fusionimage.upgradeInfo?.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
    }
    </div>
  )
}

async function BaseItemImage({baseitemimage}: {baseitemimage: Models.Equipment}) {
  // returns image of base equipment
  const rarityColors = new Map<string, string>([
    ["Common",     "#FFFFFF"],
    ["Uncommon",   "#68D5ED"],
    ["Rare",     "#B36BFF"],
    ["Unique",     "#FF00FF"],
    ["Epic", "#FFB400"],
    ["Chronicle", "#FF6666"],
    ["Legendary", "#FF7800"],
    ["Mythic", "#FFB400"],
  ]);
  return (
    <div style ={{
    }}>
      <Image style = {{
        border: `1px outset ${rarityColors.get(baseitemimage.itemRarity)}`,
      }}
        src={"https://img-api.dfoneople.com/df/items/" + baseitemimage.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
    </div>
  )
}

async function AllItemimage({itemimage}: {itemimage: Models.Equipment}) {
  // returns both base and fusion equipment images
  return (
    <div style = {{
      display: 'flex',
    }}>
    <div className="equipmentImageContainer m-1 p-1" style = {{
      display: 'flex',
    }}>
      <div>
      <BaseItemImage baseitemimage={itemimage}/>
    </div>
    </div>
    <div className="equipmentImageContainer m-1 p-1" style = {{
      display: 'flex',
    }}>
    <div>
      <FusionImage fusionimage={itemimage}/>
    </div>
    </div>
    </div>
  )
}

async function Upgrade({upgrade}: {upgrade: Models.Equipment}) {
  // returns the reinforcement or amplification of an item
  var color = "#0096FF"
  if (upgrade.amplificationName != undefined) {
    color = "#FC0FC0"
  }
  return (
    <div style = {{
      color: `${color}`
    }}>
    {upgrade.reinforce != 0 &&
    `+ ${upgrade.reinforce} `
    }
    { upgrade.amplificationName != undefined &&
   `${upgrade.amplificationName}`
    }
    </div>
    )
}

async function Fusion({fusion}: {fusion: Models.Equipment}) {
  // gets info on fusion equipment
  return (
    <div>
    { fusion.ispinsInfo != undefined &&
      fusion.ispinsInfo?.options.map((option3, index) => (
        <Option3 key={index} option3={option3} />
        ))
      }
      { fusion.machineRevolutionInfo != undefined &&
      fusion.machineRevolutionInfo?.options.map((option2, index) => (
        <Option2 key={index} option2={option2} />
        ))
      }
      { fusion.dimensionCloisterInfo != undefined &&
      fusion.dimensionCloisterInfo?.options.map((option4, index) => (
        <Option4 key={index} option4={option4} />
        ))
      }
      { fusion.bakalInfo != undefined &&
      <div>
        Bakal Weapon Fusion Effects:
      </div>}
      { fusion.bakalInfo != undefined &&
      fusion.bakalInfo?.options.map((option5, index) => (
        <Option5 key={index} option5={option5} />
        ))
      }
      </div>
  )
}

async function Total({total}: {total : Models.Total}) {
  // basic information for 105 epic gear
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
  )
}

async function ItemInfo({itemInfo}: {itemInfo: Models.Equipment}) {
  // returns general item info, applicable to nearly all items
  const itemid = await getItemInfo(itemInfo.itemId)
  return (
    <div>
      <div>
        General Stats:
      </div>
    <div>
      {itemid.itemStatus.map((itemStatu,index) => (
        <ItemStatu key={index} itemStatu={itemStatu} />
      ))
      }
    </div>
      {`${itemid.itemExplainDetail}`}
    </div>
  )
}

async function ItemStatu({itemStatu}: {itemStatu: Models.ItemStatu}) {
  // returns specific general item info
  if ((itemStatu.name !== 'Durability') && (itemStatu.name !== 'Adventurer Fame') && (itemStatu.name !== 'Attack attribute')) {
    return (
      <div>
        {`${itemStatu.name}: ${itemStatu.value}`}
      </div>
    )
  }
}

async function Basic({basic}: {basic: Models.Equipment}) {
  // returns html displaying basic gear information
  const rarityColors = new Map<string, string>([
    ["Common",     "#FFFFFF"],
    ["Uncommon",   "#68D5ED"],
    ["Rare",     "#B36BFF"],
    ["Unique",     "#FF00FF"],
    ["Epic", "#FFB400"],
    ["Chronicle", "#FF6666"],
    ["Legendary", "#FF7800"],
    ["Mythic", "#FFB400"],
  ]);
  return (
    <div>
      <div>
      <BaseItemImage baseitemimage={basic}/>
      </div>
      <div style = {{
        color: rarityColors.get(`${basic.itemRarity}`)
      }}>
        {`${basic.itemRarity} ${basic.itemTypeDetail}`}
        </div>
      <div className = "xxx"style = {{
        color: rarityColors.get(`${basic.itemRarity}`)
      }}>
      {`${basic.itemName}`}
      </div>
      <div>
        <Upgrade upgrade={basic} />
      </div>
      <br></br>
      <div>
        {basic.growInfo?.total != undefined &&
          <Total total={basic.growInfo.total} />
        }
        {basic.growInfo?.options.map((opt, index) => (
          <Options key={index} option={opt} />
        ))}
      </div>
      <br></br>

      <div style = {{
      color: `#00dc00`
      }}>
        { basic.enchant != undefined &&
         `Enchants:`
        }
      </div>
        {basic.enchant?.status.map((status, index) => (
        <Status key={index} status={status} />
        ))}
      <div>
        <br></br>
      </div>
    </div>
  )
}

async function FusionCheck({fusionCheck}: {fusionCheck: Models.Equipment}) {
  // checks if a piece has a fusion and returns information on the fusion equipment
  if (fusionCheck.upgradeInfo != undefined) {
    return (
      <div>
        <div>
          <FusionImage fusionimage={fusionCheck}/>
        </div>
      <div className="text-[#FFB400]">
        {fusionCheck.upgradeInfo.itemName}
      </div>
      <Fusion fusion={fusionCheck}/>
      </div>
    )
  }
  else if(fusionCheck.itemTypeDetail == "Title") {
    return (
      <div>
        Some title images may be broken at this time. Other information should be accurate
      </div>
    )
  }
  else {
    return(
      <div>
        This equipment currently has no Fusion
      </div>
    )
  }

}

async function Item({equipItem}: {equipItem : Models.Equipment}) {
  // creates a 'card' for each piece of equipment a character is wearing
  return (
    <div>
    <div>
      {equipItem.slotName}
    </div>
    <div>
    <AllItemimage itemimage={equipItem} />
    </div>
    <div className= "grid grid-cols-3 gap-4 px-4 py-2 bg-[#000000] text-red-500 rounded-3xl m-1 p-1"style = {{
      fontSize: 10
    }}>
      <div className= "border m-1 p-2">
      <Basic basic={equipItem}/>        
      </div>
      <div className= "border m-1 p-2">
      <ItemInfo itemInfo={equipItem}/>
    </div>
      <div className= "border m-1 p-2">
      <FusionCheck fusionCheck={equipItem}/>
    </div>
    </div>
    </div>
  );
}

export default async function Equipment({ charId }: { charId: string }) {
  // maps equipment
  const equip = await getEquipment(charId);
  return (
    <div className="p-5">
      {equip.equipment.map((equip, index) => (
        <Item key={index} equipItem={equip} />
      ))}
    </div>
    
  );
}
