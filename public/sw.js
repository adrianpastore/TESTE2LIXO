//NEW
//This is the "Offline copy of pages" wervice worker
//Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function (event) {
  var indexPage = new Request('index.html');
  event.waitUntil(
      fetch(indexPage).then(function (response) {
          caches.open('pwabuilder-offline').then(function (cache) {
              console.log('[PWA Builder] Cached index page during Install' + response.url);
              return cache.addAll(['/TESTE2LIXO/public/', '/TESTE2LIXO/public/index.html', '/TESTE2LIXO/public/art.html',
                  '/TESTE2LIXO/public/contatos.html', '/TESTE2LIXO/public/cadastro.html',
                  '/TESTE2LIXO/public/entrar.html', '/TESTE2LIXO/public/experiencia.html',
                  '/TESTE2LIXO/public/local.html', '/TESTE2LIXO/public/masc.html',
                  '/TESTE2LIXO/public/img/alien1.png', '/TESTE2LIXO/public/filmes.html',
                  '/TESTE2LIXO/public/art1.jpg', '/TESTE2LIXO/public/art2.jpg',
                  '/TESTE2LIXO/public/art3.jpg', '/TESTE2LIXO/public/art4.jpg',
                  '/TESTE2LIXO/public/predador.jpg', '/TESTE2LIXO/public/mascalien2.jpg',
                  '/TESTE2LIXO/public/masbase.jpg', '/TESTE2LIXO/public/mascalien.jpg',
                  '/TESTE2LIXO/public/film1.jpg', '/TESTE2LIXO/public/film2.jpg',
                  '/TESTE2LIXO/public/film3.jpg', '/TESTE2LIXO/public/film4.jpg',
                  '/TESTE2LIXO/public/css/style.css', '/TESTE2LIXO/public/sw.js',
                  '/TESTE2LIXO/public/css/wpp.jpg'
              ]);
          });
      })
  );
});


//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(event) {
var updateCache = function(request){
  return caches.open('pwabuilder-offline').then(function (cache) {
    return fetch(request).then(function (response) {
      console.log('[PWA Builder] add page to offline'+response.url)
      return cache.put(request, response);
    });
  });
};

event.waitUntil(updateCache(event.request));

event.respondWith(
  fetch(event.request).catch(function(error) {
    console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );

    //Check to see if you have it in the cache
    //Return response
    //If not in the cache, then return error page
    return caches.open('pwabuilder-offline').then(function (cache) {
      return cache.match(event.request).then(function (matching) {
        var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
        return report
      });
    });
  })
);
})
