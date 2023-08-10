import Image from 'next/image'
import {getCharacter} from '../../Util/service'

export default async function Home() {

  const res = await getCharacter("EndOfSky");
  const char = res.rows[0];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {char.characterName}
    </main>
  )
}
