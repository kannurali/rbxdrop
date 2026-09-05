/**
 * Локальный просмотр статической сборки так, как её отдаёт GitHub Pages:
 * сайт лежит в подкаталоге, а на любой неизвестный путь возвращается 404.html.
 * Второе важно: страницы заказов, оформленных в браузере, в сборке нет, и
 * показывает их именно 404.html.
 *
 *   npm run build && npm run preview:pages
 *   http://localhost:4173/rbxdrop/
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve(process.cwd(), "out");
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/rbxdrop";
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff2": "font/woff2",
};

async function resolveFile(pathname) {
  const candidates = pathname.endsWith("/")
    ? [join(pathname, "index.html")]
    : [pathname, `${pathname}.html`, join(pathname, "index.html")];

  for (const candidate of candidates) {
    const filePath = join(ROOT, normalize(candidate));
    if (!filePath.startsWith(ROOT)) continue;
    try {
      const info = await stat(filePath);
      if (info.isFile()) return filePath;
    } catch {
      // пробуем следующий вариант
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", `http://${req.headers.host}`);

  if (BASE_PATH && !pathname.startsWith(BASE_PATH)) {
    res.writeHead(302, { Location: `${BASE_PATH}/` });
    res.end();
    return;
  }

  const relative = BASE_PATH ? pathname.slice(BASE_PATH.length) || "/" : pathname;
  const filePath = await resolveFile(relative);

  // Кеш выключен: иначе после пересборки браузер показывает прошлую версию
  const noCache = { "cache-control": "no-store" };

  if (filePath) {
    res.writeHead(200, {
      ...noCache,
      "content-type": TYPES[extname(filePath)] ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(res);
    return;
  }

  // Ровно как Pages: неизвестный путь получает 404.html со статусом 404
  res.writeHead(404, { ...noCache, "content-type": TYPES[".html"] });
  createReadStream(join(ROOT, "404.html")).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Статика из out/ на http://localhost:${PORT}${BASE_PATH}/`);
});
