"use client"
import * as Models from '@/util/models' 
import {useEffect, useState} from "react";
import Image from 'next/image'
import { Accordion } from 'flowbite-react';

export default function Talismans( { charId }: { charId: string } ) {

    const [talismans, setTalisman] = useState<Models.Talismans>();
    const [loading, setLoading] = useState<boolean>(true);

    const runeColors = new Map<string, string>([
        ["Terra Cotta",     "#CC00CC"],
        ["The Guardians",   "#81C4DF"],
        ["Second Pact",     "#FF0000"],
        ["Circle Mage",     "#00FF00"],
        ["Ancient Library", "#FFFF00"]
    ]);

    const fetchTalismans = async () => {
        const talismanResponse = await fetch(`/api/talisman/${charId}`);
        const characterTalismans : Models.Talismans = await talismanResponse.json();
        setLoading(false);
        setTalisman(characterTalismans);
    }
    
    // Runs once on page loadup
    useEffect(() => { 
        fetchTalismans()
    }, [])

    return(
        <div className="container mx-auto max-w-5xl m-10">
            {(talismans == undefined) ? (
                <div>
                    loading
                </div>
            ) : (
                <div className="p-5">
                    
                    {talismans.talismans.map((talisman, index) => (
                        <div key={talisman.talisman.slotNo} className='p-3'>
                             
                            <Talisman
                                talisman={talisman}
                                runeTypes={talisman.talisman.runeTypes}
                                runeMap={runeColors}
                            />
 
                        </div>
                    ))}
                    
                </div>

            )}
        </div>
    );
}

function Talisman(talismanInfo: {talisman: Models.Talisman, runeTypes: string[], runeMap: Map<string,string>}){
    const [talismanDetails, setTalismanDetails] = useState<Models.ItemInfo>();
    
    const fetchTaliInfo = async (itemId: string) => {
        const taliInfoResponse = await fetch(`/api/item/${itemId}`)
        const talismanInfo : Models.ItemInfo = await taliInfoResponse.json();
        setTalismanDetails(talismanInfo);
    }

    // Runs once on page loadup
    useEffect(() => { 
        fetchTaliInfo(talismanInfo.talisman.talisman.itemId)
    }, [])

    const imageStyle = {
        borderRadius: '25%',
        border: '1px solid #000',
    }
    
    
    return(
        <div className="grid grid-rows-8 rounded-3xl bg-slate-700 p-4 mb-5">
            <div className="col-span-1">
                <div>
                    <h1 className="text-xl mb-2">
                        {talismanInfo.talisman.talisman.itemName}
                    </h1>
                </div>
            </div>
            
            <div className="col-span-1">
                <div className="grid grid-cols-9">
                    <div className='col-span-1'></div>
                    <div className="col-span-1">
                        <Image
                            src={"https://img-api.dfoneople.com/df/items/" + talismanInfo.talisman.talisman.itemId}
                            width={75}
                            height={75}
                            alt="talisman image"
                            unoptimized={true}
                            style = {imageStyle}
                        /> 
                    </div>
                    <div className="col-span-2">
                        {talismanInfo.runeTypes.map((rune, index) => (
                            <div key={index}>
                                <RuneType 
                                    runeColor = {talismanInfo.runeMap.get(rune)!} 
                                    runeName  = {rune}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="col-span-4">
                        <Rune
                            talisman={talismanInfo.talisman}
                        />
                    </div>
                    <div className='col-span-1'>
                    {(talismanDetails == undefined) ? (
                        <div>
                            loading
                        </div>
                    ) : (
                        <div>
                            {talismanDetails.itemExplain}
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <br/>
            
        </div>
    );
}

function RuneType(rune: {runeColor: string, runeName: string}){
    return(
        <div style={{color: rune.runeColor}}>
            {"[" + rune.runeName + "]"}
        </div>
    )
}

function Rune(runes: {talisman: Models.Talisman}){
    const runeRarity = new Map<string, string>([
        ["Cracked",     "#FFFFFF"],
        ["Discolored",  "#68D5ED"],
        ["Vivid",       "#B36BFF"],
        ["Ornate",      "#FF00FF"]
    ]);
    
    return(
        <div>
            {runes.talisman.runes.map((rune, index) => (
                <div key={index}>
                    <div style={{color: runeRarity.get(rune.itemName.split(" ", 2)[0])}}>{rune.itemName}</div>
                </div>
            ))}
        </div>
    )
}