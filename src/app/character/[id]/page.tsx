"use client"
import {CharacterBasicInfo, Characters, getBasicCharacterInfo, getCharacter} from '../../../../Util/service';
import {useEffect, useState} from "react";

export default function Page({params}: { params: { id: string } }) {

    const [character, setCharacter] = useState<CharacterBasicInfo>();
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCharacterBasicInfo = async () => {
        const characterBasicInfoResponse = await fetch(`/api/character/${params.id}`);
        const characterBasicInfo : CharacterBasicInfo = await characterBasicInfoResponse.json();
        setLoading(false);
        setCharacter(characterBasicInfo);
    }

    useEffect(() => {
        fetchCharacterBasicInfo();
    }, [])

    const rows = [];
    for (let i = 0; i < 7; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<div className="h-7 rounded-full bg-gray-700 w-1/2 mb-1"></div>);
    }

    return (<div className="container mx-auto max-w-2xl m-10">
        <div className="text-2xl p-5">Basic Character Information</div>
        <hr/>
        {loading || character == undefined ? <div>
            <div role="status" className="animate-pulse mb-5">
                {rows}
                <span className="sr-only">Loading...</span>
            </div>

        </div> : <div className="p-5">
            <div>
                Character Name: {character.characterName}
            </div>
            <div>
                Character Level: {character.level}
            </div>
            <div>
                Job Name: {character.jobName}
            </div>
            <div>
                Advancement: {character.jobGrowName}
            </div>
            <div>
                Account Name: {character.adventureName}
            </div>
            <div>
                Guild Name: {character.guildName}
            </div>
        </div>
        }
    </div>);
}