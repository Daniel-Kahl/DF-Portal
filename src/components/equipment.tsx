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
    <div>
      <br></br>
      <div style= {{
        backgroundColor: 'black',
      }}>
      <h1 style= {{color: 'white', fontSize: 10}} >{`Level: ${option.level}`}</h1>
      </div>
      <div style= {{
        backgroundColor: 'gray', fontSize: 10
      }}>
      {`Damage Value:`}
      <span style ={{color: 'blue'}}>{`${damage} `}</span>
      {`Buff: ${option.buff}`}
      </div>
      <div style= {{
        backgroundColor: 'white', fontSize: 10
      }}>
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
    <div>
      {`${status.name} `}
      {`${status.value} `}
    </div>
  )
}

async function Itemimage({itemimage}: {itemimage: Models.Equipment}) {
  return (
    <div className="equipmentImageContainer" style = {{
      display: 'flex'
    }}>
      <div className ='equipmentBorderContainer' style = {{
        position: 'absolute',
        display: 'flex'
      }}>
      <Image
      src={"/epic.png"}
      width={28}
      height={28}
      unoptimized={true}
      alt="item image"
    />
      </div>
      <div>
    <Image style = {{border: '1px outset #FFB400'}}
      src={"https://img-api.dfoneople.com/df/items/" + itemimage.itemId}
      width={28}
      height={28}
      unoptimized={true}
      alt="item image"
    />
    </div>
    {itemimage.upgradeInfo?.itemId != undefined &&
      <Image
        src={"https://img-api.dfoneople.com/df/items/" + itemimage.upgradeInfo?.itemId}
        width={28}
        height={28}
        unoptimized={true}
        alt="item image"
      />
    }
    </div>
  )
}

async function Upgrade({upgrade}: {upgrade: Models.Equipment}) {
  return (
    <div>
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
  return (
    <div>  
    Total Option Level: {total.level}
    <br></br>
    Total Damage Value: {total.damage} 
    <br></br>
    Total Buff Value: {total.buff}
    </div>
  )
}

async function Basic({basic}: {basic: Models.Equipment}) {
  return (
    <div>
      {`${basic.slotName}: ${basic.itemName}`}
      <div>
        <Itemimage itemimage={basic} />
      </div>
      <div>
        <Upgrade upgrade={basic} />
      </div>
      <div>
        {basic.growInfo?.total != undefined &&
          <Total total={basic.growInfo.total} />
        }
        {basic.growInfo?.options.map((opt, index) => (
          <Options key={index} option={opt} />
        ))}
      </div>
      <br></br>

      <div>
        { basic.enchant != undefined &&
         `Enchants:`
        }
      </div>
        {basic.enchant?.status.map((status, index) => (
        <Status key={index} status={status} />
        ))}
      <div>
        <br></br>

        <div>
          {basic.itemRarity}
        </div>
      </div>
    </div>
  )
}

async function FusionCheck({fusionCheck}: {fusionCheck: Models.Equipment}) {
  return (
    <Fusion fusion={fusionCheck}/>
  )
}

async function Item({equipItem}: {equipItem : Models.Equipment}) {
  const itemid = await getItemInfo(equipItem.itemId)
  return (
    <div className= "grid grid-cols-2 gap-4 px-4 py-2 bg-[#000000] text-red-500 rounded-3xl m-2 font-serif">
      <div>
      <Basic basic={equipItem}/>
    </div>
      <div>
      <FusionCheck fusionCheck={equipItem}/>
    </div>
    </div>
  );
}

export default async function Equipment({ charId }: { charId: string }) {
  const equip = await getEquipment(charId);
  return (
    <div className="p-5">
      {equip.equipment.map((equip, index) => (
        <Item key={index} equipItem={equip} />
      ))}
    </div>
    
  );
}
