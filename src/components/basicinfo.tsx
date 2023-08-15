import { getBasicCharacterInfo } from "@/util/service";

export default async function CharacterInfo({charId}: {charId : string}) {

    const information = await getBasicCharacterInfo(charId)

    return (
    <div>
        {information == undefined ? (
            <span className="sr-only">
                Loading...
            </span>
        ) : 
        (
            <div className="bg-slate-800 rounded-lg m-2 p-4">
                <p>Character Name: {information?.characterName}</p>
                <p>Character Level: {information?.level}</p>
                <p>Job Name: {information?.jobName}</p>
                <p>Advancement: {information?.jobGrowName}</p>
                <p>Account Name: {information?.adventureName}</p>
                <p>Guild Name: {information?.guildName}</p>
            </div>
        )}
    </div>
    )
}