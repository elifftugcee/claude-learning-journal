export default async () => {
  const siteEnv = process.env.SITE_ENV;
  if (!siteEnv) {
    return Response.json({ error: "SITE_ENV tanımlı değil" }, { status: 500 });
  }
  return Response.json({ siteEnv });
};
