const SERVER = "cain";
const API_URL = "https://api.dfoneople.com/df/" + SERVER;
const API_KEY = 'apikey=' + process.env.API_KEY;

export interface Character {
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