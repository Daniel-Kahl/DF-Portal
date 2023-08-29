import {NextApiRequest, NextApiResponse} from "next";
import {getAvatar} from "@/util/service";
import {Avatars} from "@/util/models"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Avatars>
) {
    const { query } = req
    const { id } = query

    if (id == undefined) {
        return res.status(401);
    }

    const data = await getAvatar(id as string);
    return res.status(200).json(data);
}