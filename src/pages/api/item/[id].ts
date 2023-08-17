import {NextApiRequest, NextApiResponse} from "next";
import {getItemInfo} from "@/util/service";
import {ItemInfo} from "@/util/models"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ItemInfo>
) {
    const { query } = req
    const { id } = query

    if (id == undefined) {
        return res.status(401);
    }

    const data = await getItemInfo(id as string);
    return res.status(200).json(data);
}