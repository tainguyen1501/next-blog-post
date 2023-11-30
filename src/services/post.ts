import repo from "@/db/repo";
import { IBaseQueryModel } from "@/models/common";

const post = {
  getBySlug: async (slug: string) => {
    let query: IBaseQueryModel = {
      page: Number(0),
      size: Number(1),
    };
    query.filter = { slug: slug };

    const result = await repo.find("post", query);
    return result && result.length > 0 ? result[0] : null;
  },

};

export default post;
