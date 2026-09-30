const badge = document.getElementById("site-env-badge");

fetch("/api/site-env")
  .then((res) => {
    if (!res.ok) throw new Error("SITE_ENV alınamadı");
    return res.json();
  })
  .then(({ siteEnv }) => {
    if (!siteEnv) throw new Error("SITE_ENV boş");
    if (badge) {
      badge.textContent = siteEnv;
    }
  })
  .catch(() => {
    // API rotasına erişilemiyorsa (örn. yerel dosya olarak açıldıysa) veya hata dönerse rozette bunu göster.
    if (badge) {
      badge.textContent = "SITE_ENV kullanılamıyor";
    }
  });
