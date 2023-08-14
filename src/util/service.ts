import * as Models from '@/util/models' 

const SERVER = "cain";
const API_URL = "https://api.dfoneople.com/df/" + SERVER;
const API_KEY = 'apikey=' + process.env.API_KEY;

// 02. Get character ID by name API call
export async function getCharacter(charName: string): Promise<Models.Characters> {

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

// 02. Get character ID by name API call
export async function searchCharacter(searchText: string, rows?: number): Promise<Models.Characters> {
  if (searchText.length < 4) return new Promise<Models.Characters>((resolve) => { resolve({rows: []}) });

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

// 03. Get basic info API Call
export async function getBasicCharacterInfo(charId: string): Promise<Models.CharacterBasicInfo> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  headers.set('apikey', process.env.API_KEY??'')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  const request: RequestInfo = new Request(`https://api.dfoneople.com/df/servers/cain/characters/${charId}`, {
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

// 04. Getting stat info API call
export async function getStats(charID: string): Promise<Models.Stat> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  headers.set('apikey', process.env.API_KEY??'')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var Uri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/status?`;
  const request: RequestInfo = new Request(Uri, {
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

// 05. Getting equipment info API call
export async function getEquipment(charID: string): Promise<Models.Equipped> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  headers.set('apikey', process.env.API_KEY??'')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var Uri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/equip/equipment?`;
  const request: RequestInfo = new Request(Uri, {
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

// 06. Getting avatar info API call
export async function getAvatar(charID: string): Promise<Models.Avatars> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var avatarUri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/equip/avatar?${API_KEY}`;
  const request: RequestInfo = new Request(avatarUri, {
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

// 07. Getting creature API call
export async function getCreature(charID: string): Promise<Models.Creatures> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var creatureUri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/equip/creature?${API_KEY}`;
  const request: RequestInfo = new Request(creatureUri, {
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

// 08. Getting Insignia API call
export async function getInsignia(charID: string): Promise<Models.Insignia> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var flagUri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/equip/flag?${API_KEY}`;
  const request: RequestInfo = new Request(flagUri, {
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

// 09. Getting Talismans API call
export async function getTalisman(charID: string): Promise<Models.Talismans> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var talismanUri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/equip/talisman?${API_KEY}`;
  const request: RequestInfo = new Request(talismanUri, {
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

// 10. Gettings skills API call
export async function getSkill(charID: string): Promise<Models.Skills> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var skillUri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/skill/style?${API_KEY}`;
  const request: RequestInfo = new Request(skillUri, {
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

// 11. Getting buff swap equipment API call
export async function getBuffEquip(charID: string): Promise<Models.buffEquips> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var BuffEquipUri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/skill/buff/equip/equipment?${API_KEY}`;
  const request: RequestInfo = new Request(BuffEquipUri, {
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

// 12. Getting buff avatar API call
export async function getBuffAvatar(charID: string): Promise<Models.buffAvatars> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var BuffAvaUri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/skill/buff/equip/avatar?${API_KEY}`;
  const request: RequestInfo = new Request(BuffAvaUri, {
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

// 13. Getting buff swap creatures API call
export async function getBuffCreature(charID: string): Promise<Models.buffCreatures> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  var buffCreUri = `https://api.dfoneople.com/df/servers/cain/characters/${charID}/skill/buff/equip/creature?${API_KEY}`;
  const request: RequestInfo = new Request(buffCreUri, {
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