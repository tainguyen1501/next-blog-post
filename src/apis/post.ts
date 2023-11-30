const post = {
  get: async () => {
    try {
      const res = await fetch("/api/posts", {
        method: "GET",
      });

      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  getById: async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "GET",
      });

      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
};

export default post;
