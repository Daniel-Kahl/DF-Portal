import { getAvatar, getBuffAvatar, getBuffCreature, getBuffEquip, getCharacter, getCreature, getEquipment, getInsignia, getStat, getTalisman, getSkill, getBasicCharacterInfo} from '../../../../Util/service';
import { useRouter } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const resChar = await getCharacter("EndOfSky");
    const resBasicChar = await getBasicCharacterInfo("224ab853b8077fdbd86844a3c8fec51d")
    const resEquip = await getEquipment("224ab853b8077fdbd86844a3c8fec51d");
    const resAvatar = await getAvatar("224ab853b8077fdbd86844a3c8fec51d")
    const resStat = await getStat("224ab853b8077fdbd86844a3c8fec51d")
    const resCreature = await getCreature("224ab853b8077fdbd86844a3c8fec51d")
    const resInsignia = await getInsignia("224ab853b8077fdbd86844a3c8fec51d")
    const resTalisman = await getTalisman("224ab853b8077fdbd86844a3c8fec51d")
    const resSkill = await getSkill("224ab853b8077fdbd86844a3c8fec51d")
    const resBuffEquip = await getBuffEquip("224ab853b8077fdbd86844a3c8fec51d")
    const resBuffAvatar = await getBuffAvatar("224ab853b8077fdbd86844a3c8fec51d")
    const resBuffCreature = await getBuffCreature("224ab853b8077fdbd86844a3c8fec51d")
    const char = resChar.rows[0];
    const basicChar = resBasicChar;
    const stat = resStat;
    const equip = resEquip;
    const avatar = resAvatar;
    const creature = resCreature;
    const insignia = resInsignia;
    const talisman = resTalisman;
    const skill = resSkill;
    const buffEquip = resBuffEquip;
    const buffAvatar = resBuffAvatar;
    const buffcreature = resBuffCreature;
    let eq:string[] = [];
    for (let e in equip.equipment) {
      eq[e] = 'https://img-api.dfoneople.com/df/items/' + equip.equipment[e].itemId
    }
    const res = await getBasicCharacterInfo(params.id);

    console.log(res);

    return (
        <div>
        <div>
            Character Name: {res.characterName}
        </div>
        <div>
        {<img
      src= {eq[0]}
      />}
      {<img
      src= {eq[1]}
      />}
      {<img
      src= {eq[2]}
      />}
      {<img
      src= {eq[3]}
      />}
      {<img
      src= {eq[4]}
      />}
      {<img
      src= {eq[5]}
      />}
      {<img
      src= {eq[6]}
      />}
      {<img
      src= {eq[7]}
      />}
      {<img
      src= {eq[8]}
      />}
      {<img
      src= {eq[9]}
      />}
      {<img
      src= {eq[10]}
      />}
      {<img
      src= {eq[11]}
      />}     
      {<img
      src= {eq[12]}
      />} 
      {stat.level}
      <br>
      </br>
      {skill.skill.style.active[0].name}
      <br>
      </br>
      {avatar.avatar[1].slotName}
      <br>
      </br>
      {char.characterId}
      <br>
      </br>
      {creature.creature.itemName}
      <br>
      </br>
      {basicChar.characterName}
      <br>
      </br>
      {insignia.flag.itemName}
      <br>
      </br>
      {talisman.talismans[1].talisman.itemName}
      <br>
      </br>
      {buffEquip.skill.buff.skillInfo.name}
      <br>
      </br>
      {buffAvatar.skill.buff.skillInfo.option.level}
      <br>
      </br>
      {buffcreature.skill.buff.skillInfo.option.desc}
        </div>
        <div>
            Character Level: {res.level}
        </div>
        <div>
            Job Name: {res.jobName}
        </div>
        <div>
            Advancement: {res.jobGrowName}
        </div>
        <div>
            Account Name: {res.adventureName}
        </div>
        <div>
            Guild Name: {res.guildName}
        </div>
    </div>
    )
}