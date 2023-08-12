"use client"
import {CharacterBasicInfo, Characters, getBasicCharacterInfo, getCharacter, getEquipment,Equipped,Equipment,Enchant,Status,GrowInfo,Total,Option,Default,MachineRevolutionInfo,Option2,UpgradeInfo,IspinsInfo,Option3} from '../../../../Util/service';
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

    useEffect(() => { //runs once on page loadup, add fetch methods here
        fetchCharacterBasicInfo();
        fetchEquipped();
    }, [])

    const rows = [];
    for (let i = 0; i < 7; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<div className="h-7 rounded-full bg-gray-700 w-1/2 mb-1"></div>);
    }

    const [equip, setEquip] = useState<Equipped>();

    const fetchEquipped = async () => {
        const equippedResponse = await fetch(`/api/equipment/${params.id}`);
        const equipped : Equipped = await equippedResponse.json();
        console.log(equipped);
        setLoading(false);
        setEquip(equipped);
    }
// what am i doing 

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

        <div className="text-2xl p-5">Equipment</div>
        {loading || equip == undefined ? <div>
            <div role="status" className="animate-pulse mb-5">
                {rows}
                <span className="sr-only">Loading...</span>
            </div>

        </div> : <div className="p-5">
            <div>
            {equip.equipment.map((equip, index) => (
                              <div key={index} className="px-2 py-2 bg-slate-500">
                                {`${equip.slotName}:     ${equip.itemName} `} 
                              </div>
                          ))}
            </div>
        </div>
        }
    </div>);
}