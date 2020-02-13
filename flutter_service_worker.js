'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/assets\AssetManifest.json": "6707210e29b7a7ca5de4eb31b20f5430",
"/assets\FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"/assets\fonts\MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets\images\My%20pic-1.jpg": "55c67cd01f75b837568f0b6382fa6530",
"/assets\LICENSE": "1a80be6c5724a31e6f9c9e06dba53b63",
"/assets\packages\cupertino_icons\assets\CupertinoIcons.ttf": "9a62a954b81a1ad45a58b9bcea89b50b",
"/index.html": "fe3cf862f166aa06d61725137a1f29f2",
"/main.dart.js": "493b69b41d369e826d3aeed99974f224"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
