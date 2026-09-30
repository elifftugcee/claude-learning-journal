export default function handler(req, res) {
  const siteEnv = process.env.SITE_ENV;
  if (!siteEnv) {
    return res.status(500).json({ error: "SITE_ENV tanımlı değil" });
  }
  res.status(200).json({ siteEnv });
}
