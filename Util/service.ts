const SERVER = "cain";
const API_URL = "https://api.dfoneople.com/df/" + SERVER;
const API_KEY = 'apikey=' + process.env.API_KEY;

export interface Characters {
  rows: Row[]
}

export interface Row {
  serverId: string
  characterId: string
  characterName: string
  level: number
  jobId: string
  jobGrowId: string
  jobName: string
  jobGrowName: string
  fame: number
}

export async function getCharacter(charName: string): Promise<Characters> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  const request: RequestInfo = new Request("https://api.dfoneople.com/df/servers/cain/characters?characterName=" + charName + "&wordType=match&" + API_KEY, {
    method: 'GET',
    headers: headers
  })

  // Use fetch to retrieve data
  const res = await fetch(request);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function searchCharacter(searchText: string, rows?: number): Promise<Characters> {
  if (searchText.length < 4) return new Promise<Characters>((resolve) => { resolve({rows: []}) });

  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  
  var searchURI = `https://api.dfoneople.com/df/servers/cain/characters?characterName=${searchText}&wordType=full&limit=${rows ?? 10}&${API_KEY}`;

  const request: RequestInfo = new Request(searchURI, {
    method: 'GET',
    headers: headers
  });
  
  const res = await fetch(request);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}


export interface CharacterBasicInfo {
  characterId:   string;
  characterName: string;
  level:         number;
  jobId:         string;
  jobGrowId:     string;
  jobName:       string;
  jobGrowName:   string;
  adventureName: string;
  guildId:       string;
  guildName:     string;
}

export async function getBasicCharacterInfo(charId: string): Promise<CharacterBasicInfo> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  const request: RequestInfo = new Request(`https://api.dfoneople.com/df/servers/cain/characters/${charId}?${API_KEY}`, {
    method: 'GET',
    headers: headers
  })

  // Use fetch to retrieve data
  const res = await fetch(request);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}