import {NextApiRequest, NextApiResponse} from "next";
import {getBuffEquip} from "@/util/service";
import {buffEquips} from "@/util/models"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<buffEquips>
) {
    const { query } = req
    const { id } = query

    if (id == undefined) {
        return res.status(401);
    }

    const data = await getBuffEquip(id as string);
    return res.status(200).json(data);
}