const SERVER = "cain";
const API_URL = "https://api.dfoneople.com/df/" + SERVER;
const API_KEY = 'apikey=' + process.env.API_KEY;

export interface Character {
  rows: CharacterRow[]
}

export interface CharacterRow {
  serverId: string,
  characterId: string,
  characterName: string,
  level: number,
  jobId: string,
  jobGrowId: string,
  jobName: string,
  jobGrowName: string,
  fame: number
}

export interface Equppied {
  rows: EquppiedRow[]
}

export interface EquppiedRow {
  characterId: string,
  characterName: string,
  level: number,
  jobId: string,
  jobGrowId: string,
  jobName: string,
  jobGrowName: string,
  adventureName: string,
  guildId: string,
  guildName: string,
  equipment: Equipment[],
  setItemInfo: any[]
}

export interface Equipment {
  slotId: string
  slotName: string
  itemId: string
  itemName: string
  itemTypeId: string
  itemType: string
  itemTypeDetailId: string
  itemTypeDetail: string
  itemAvailableLevel: number
  itemRarity: string
  setItemId: any
  setItemName: any
  reinforce: number
  itemGradeName: string
  enchant: Enchant
  amplificationName: string
  refine: number
  growInfo: GrowInfo
  engraveName: boolean
  machineRevolutionInfo: MachineRevolutionInfo
  upgradeInfo: UpgradeInfo
  ispinsInfo: IspinsInfo
}

export interface Enchant {
  status: Status[]
}

export interface Status {
  name: string
  value: any
}

export interface GrowInfo {
  transfer: boolean
  total: Total
  options: Option[]
}

export interface Total {
  damage: number
  buff: number
  level: number
}

export interface Option {
  level: number
  expRate: number
  explain: string
  explainDetail: string
  damage: number
  default: Default
  buff: number
}

export interface Default {
  damage: number
  buff: number
}

export interface MachineRevolutionInfo {
  options: Option2[]
}

export interface Option2 {
  buff: number
  explain: string
  explainDetail: string
}

export interface UpgradeInfo {
  itemId: string
  itemName: string
}

export interface IspinsInfo {
  options: Option3[]
}

export interface Option3 {
  buff: number
  explain: string
  explainDetail: string
}

export async function getCharacter(charName: string): Promise<Character> {

    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
  
    // Create the request object, which will be a RequestInfo type. 
    // Here, we will pass in the URL as well as the options object as parameters.
    const request: RequestInfo = new Request("https://api.dfoneople.com/df/servers/cain/characters?characterName=" + charName + "&wordType=match&"+API_KEY, {
      method: 'GET',
      headers: headers
    })

    const res = await fetch(request);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    // Use fetch to retrieve data 
    return res.json();
  }

  export async function getEquipment(charID: string): Promise<Equppied> {

    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
  
    // Create the request object, which will be a RequestInfo type. 
    // Here, we will pass in the URL as well as the options object as parameters.
    const request: RequestInfo = new Request("https://api.dfoneople.com/df/servers/cain/characters/"+ charID +"/equip/equipment?" +API_KEY, {
      method: 'GET',
      headers: headers
    })

    const res = await fetch(request);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    // Use fetch to retrieve data 
    return res.json();
  }