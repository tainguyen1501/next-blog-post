const utils = {
  string: {
    slugify: (input: string) => {
      if (!input) return "";
      // make lower case and trim
      var slug = input.toLowerCase().trim();
      slug = slug.replaceAll('đ', 'd')
      // remove accents from charaters
      slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // replace invalid chars with spaces
      slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();

      // replace multiple spaces or hyphens with a single hyphen
      slug = slug.replace(/[\s-]+/g, "-");

      return slug;
    },
    isValidEmail: (email: string) =>{
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }
  },
};
export default utils;
