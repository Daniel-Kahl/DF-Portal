import { Characters, getBasicCharacterInfo, getCharacter } from '../../../../Util/service';
import { useRouter } from 'next/navigation';



export default async function Page({ params }: { params: { id: string } }) {

    const res = await getBasicCharacterInfo(params.id);

    console.log(res);

    return <div>
        <div>
            Character Name: {res.characterName}
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
}