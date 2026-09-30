---
description: Projenin temel dosya ve yapı kontrolünü yapar (salt okunur)
allowed-tools: Read, Glob, Grep
---

Bu projede aşağıdaki kontrolleri yap. Hiçbir dosyayı değiştirme, sadece oku.

1. Şu dosyaların var olduğunu kontrol et: `index.html`, `style.css`, `script.js`.
2. `index.html` içinde şu section ID'lerinin bulunduğunu kontrol et:
   `yolculuk`, `moduller`, `komutlar`, `promptlar`, `projeler`.
3. `script.js` içinde `/.netlify/functions/site-env` adresinin geçtiğini kontrol et.
4. `netlify/functions/site-env.mjs` dosyasının var olduğunu kontrol et.

Sonunda her madde için ✅ veya ❌ içeren kısa bir rapor ver. Bulduğun sorunları
düzeltmeye çalışma, sadece raporla.
