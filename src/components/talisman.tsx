"use client"
import * as Models from '@/util/models' 
import {useEffect, useState} from "react";
import Image from 'next/image'

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

    useEffect(() => { // Runs once on page loadup
        fetchTalismans();
    }, [])

    return(
        <div className="container mx-auto max-w-2xl m-10">
            {talismans == undefined ? (
                <div>
                    loading
                </div>
            ) : (
                <div className="p-5">
                    
                    {talismans.talismans.map((talisman, index) => (
                        <div>
                            <Talisman
                                talisman={talisman}
                                runeTypes={talisman.talisman.runeTypes}
                                runeMap={runeColors}
                            />
                            <Rune
                                talisman={talisman}
                            />
                        </div>
                    ))}
                    
                </div>

            )}
        </div>
    );
}

function Talisman(talismanInfo: {talisman: Models.Talisman, runeTypes: string[], runeMap: Map<string,string>}){
    return(
        <div className="grid grid-rows-8">
            <div className="col-span-1">
                <div>
                    <h1 className="text-xl">
                        {talismanInfo.talisman.talisman.itemName}
                    </h1>
                </div>
            </div>
            
            <div className="col-span-1">
                <div className="grid grid-cols-8">
                    <div className="col-span-1">
                        <Image
                            src={"https://img-api.dfoneople.com/df/items/" + talismanInfo.talisman.talisman.itemId}
                            width={75}
                            height={75}
                            alt="talisman image"
                            unoptimized={true}
                        /> 
                    </div>
                    <div className="col-span-3">
                        {talismanInfo.runeTypes.map((rune, index) => (
                            <div>
                                <RuneType 
                                    runeColor = {talismanInfo.runeMap.get(rune)!} 
                                    runeName  = {rune}
                                />
                            </div>
                        ))}
                    </div> 
                </div>
            </div>
            <br/>
        </div>
    );
}

function RuneType(rune: {runeColor: string, runeName: string}){

    return(
        <div>
            <div style={{color: rune.runeColor}}>
                {rune.runeName}
            </div>
        </div>
    )
}

function Rune(runes: {talisman: Models.Talisman}){
    return(
        <div>
            {runes.talisman.runes.map((rune, index) => (
                <div>
                    <div>{rune.itemName}</div>
                </div>
            ))}
        </div>
    )
}