import {NextApiRequest, NextApiResponse} from "next";
import {getEquipment} from "@/util/service";
import {Equipped} from "@/util/models"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Equipped>
) {
    const { query } = req
    const { id } = query

    if (id == undefined) {
        return res.status(401);
    }

    const data = await getEquipment(id as string);
    return res.status(200).json(data);
}