import * as Models from "@/util/models";

const SERVER = "cain";
const API_URL = "https://api.dfoneople.com/df/servers/" + SERVER;

const DEFAULT_HEADER: [string, string][] = [
  ["Content-Type", "application/json"],
  ["Accpet", " application/json"],
  ["apikey", process.env.API_KEY ?? ""],
];

// 02. Get character ID by name API call
export async function getCharacter(
  charName: string
): Promise<Models.Characters> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  const request: RequestInfo = new Request(
    `${API_URL}/characters?characterName=${charName}&wordType=match`,
    {
      method: "GET",
      headers: DEFAULT_HEADER,
    }
  );

  // Use fetch to retrieve data
  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// 02. Get character ID by name API call
export async function searchCharacter(
  searchText: string,
  rows?: number
): Promise<Models.Characters> {
  if (searchText.length < 4)
    return new Promise<Models.Characters>((resolve) => {
      resolve({ rows: [] });
    });

  var searchURI = `${API_URL}/characters?characterName=${searchText}&wordType=full&limit=${
    rows ?? 10
  }`;

  const request: RequestInfo = new Request(searchURI, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// 03. Get basic info API Call
export async function getBasicCharacterInfo(
  charId: string
): Promise<Models.CharacterBasicInfo> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  const request: RequestInfo = new Request(`${API_URL}/characters/${charId}`, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  // Use fetch to retrieve data
  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// 04. Getting stat info API call
export async function getStats(charId: string): Promise<Models.Stat> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var Uri = `${API_URL}/characters/${charId}/status?`;
  const request: RequestInfo = new Request(Uri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 05. Getting equipment info API call
export async function getEquipment(charId: string): Promise<Models.Equipped> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var Uri = `${API_URL}/characters/${charId}/equip/equipment?`;
  const request: RequestInfo = new Request(Uri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 06. Getting avatar info API call
export async function getAvatar(charId: string): Promise<Models.Avatars> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var avatarUri = `${API_URL}/characters/${charId}/equip/avatar`;
  const request: RequestInfo = new Request(avatarUri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 07. Getting creature API call
export async function getCreature(charId: string): Promise<Models.Creatures> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var creatureUri = `${API_URL}/characters/${charId}/equip/creature?`;
  const request: RequestInfo = new Request(creatureUri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 08. Getting Insignia API call
export async function getInsignia(charId: string): Promise<Models.Insignia> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var flagUri = `${API_URL}/characters/${charId}/equip/flag?`;
  const request: RequestInfo = new Request(flagUri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 09. Getting Talismans API call
export async function getTalisman(charId: string): Promise<Models.Talismans> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var talismanUri = `${API_URL}/characters/${charId}/equip/talisman?`;
  const request: RequestInfo = new Request(talismanUri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 10. Gettings skills API call
export async function getSkill(charId: string): Promise<Models.Skills> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var skillUri = `${API_URL}/characters/${charId}/skill/style?`;
  const request: RequestInfo = new Request(skillUri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 11. Getting buff swap equipment API call
export async function getBuffEquip(charId: string): Promise<Models.buffEquips> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var BuffEquipUri = `${API_URL}/characters/${charId}/skill/buff/equip/equipment?`;
  const request: RequestInfo = new Request(BuffEquipUri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 12. Getting buff avatar API call
export async function getBuffAvatar(
  charId: string
): Promise<Models.buffAvatars> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var BuffAvaUri = `${API_URL}/characters/${charId}/skill/buff/equip/avatar?`;
  const request: RequestInfo = new Request(BuffAvaUri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 13. Getting buff swap creatures API call
export async function getBuffCreature(
  charId: string
): Promise<Models.buffCreatures> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var buffCreUri = `${API_URL}/characters/${charId}/skill/buff/equip/creature?`;
  const request: RequestInfo = new Request(buffCreUri, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}

// 15. Getting item information API call
export async function getItemInfo(
  itemId: string
): Promise<Models.ItemInfo> {
  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  var itemInfoURI = `https://api.dfoneople.com/df/items/${itemId}?`;
  const request: RequestInfo = new Request(itemInfoURI, {
    method: "GET",
    headers: DEFAULT_HEADER,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Use fetch to retrieve data
  return res.json();
}
