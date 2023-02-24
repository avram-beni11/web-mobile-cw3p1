var cacheName = "webapp-v1";
var cacheFiles = [
    "index.html",
    "assets/art.png",
    "assets/english.png",
    "assets/geography.png",
    "assets/history.png",
    "assets/it.png",
    "assets/japanese.png",
    "assets/logo.png",
    "assets/logo2.png",
    "assets/math.png",
    "assets/music.png",
    "assets/programming.png",
    "assets/science.png"
];

self.addEventListener("install", function (e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching all files");
            return cache.addAll(cacheFiles);
        })
    );
});
