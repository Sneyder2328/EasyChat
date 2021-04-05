import { User } from "../database/models/User";

import { raw } from "objection";

export const findUser = async (id: string, idContent: string) =>
    User.query().findOne(id, idContent).where(raw('deletedAt IS NULL'));
