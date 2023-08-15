import {NextApiRequest, NextApiResponse} from "next";
import {getTalisman} from "@/util/service";
import {Talismans} from "@/util/models"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Talismans>
) {
    const { query } = req
    const { id } = query

    if (id == undefined) {
        return res.status(401);
    }

    const data = await getTalisman(id as string);
    return res.status(200).json(data);
}