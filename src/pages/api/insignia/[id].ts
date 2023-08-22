import {NextApiRequest, NextApiResponse} from "next";
import {getInsignia} from "@/util/service";
import {Insignia} from "@/util/models"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Insignia>
) {
    const { query } = req
    const { id } = query

    if (id == undefined) {
        return res.status(401);
    }

    const data = await getInsignia(id as string);
    return res.status(200).json(data);
}