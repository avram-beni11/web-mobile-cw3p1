const { response } = require("express");

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
    "assets/science.png",
    "products.js"
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

self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (cacheFiles) {
            if (cachedFile) {
                console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);

                return cacheFiles;
            } else {
                return fetch(e.request).then(function (response) {
                    
                    return caches.open(cacheName).then(function (cache) {
                        cache.put(e.request, response.clone());

                        console.log("[Service Worker] Resource fetched and saved in the cache for: " + e.request.url);

                        return response;
                    })
                })
            }
        })
    )
});
