import { NextResponse } from 'next/server'
import { getCharacter, searchCharacter } from '../../../../Util/service'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const requestType = searchParams.get("requestType");
    const username = searchParams.get("username");
    const limit = searchParams.get("limit");

    if (!requestType || !username) {
        return NextResponse.next()
    }

    if (requestType === "full") {   // Fuzzy matching
        const limitNumber = limit ? parseInt(limit) : undefined;
        const data = await searchCharacter(username, limitNumber);
        return NextResponse.json(data);
    } else if (requestType === "match") {   // Exact matching
        const data = await getCharacter(username);
        return NextResponse.json(data);
    } else {
        return NextResponse.next()
    }
}