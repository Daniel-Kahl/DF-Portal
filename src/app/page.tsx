import Image from 'next/image'
import {getCharacter, getEquipment} from '../../Util/service'

export default async function Home() {

  const res = await getCharacter("EndOfSky");
  const res1 = await getEquipment("224ab853b8077fdbd86844a3c8fec51d");
  const char = res.rows[0];
  const equip = res1;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {char.characterName}
      {char.jobGrowName}
      {equip.guildName}
    </main>
  )
}
