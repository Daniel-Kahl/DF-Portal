import {NextApiRequest, NextApiResponse} from "next";
import {CharacterBasicInfo} from "@/util/models";
import {getBasicCharacterInfo} from "@/util/service";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CharacterBasicInfo>
) {
    const { query } = req
    const { id } = query

    if (id == undefined) {
        return res.status(401);
    }

    const data = await getBasicCharacterInfo(id as string);
    return res.status(200).json(data);
}