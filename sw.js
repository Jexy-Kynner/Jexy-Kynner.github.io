/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/05/10/html学习/index.html","efd132375a678480e35dba94dc025d00"],["/2024/05/10/楔子/index.html","982f3b2c10facfd29472e63a1812bb16"],["/2024/05/11/前置/index.html","aac041ffa3aa7a20f7123bcd0223e2fb"],["/2024/05/22/ROP/index.html","c0992237850b5992710cc6d39eb880b8"],["/2024/06/01/BUU_ciscn_2019_n_1/index.html","71d499856490d3d89bc3411974dc3669"],["/2024/06/01/BUU_jarvisoj_level0/index.html","49767b026730fe909ae517b2a6e45e7e"],["/2024/06/12/BUU_ciscn_2019_c_1/index.html","5a11734512d0669fdc8c3e791fa919b9"],["/2024/06/16/格式化字符串/index.html","a80fbc823eb2b80aa5f014091861e957"],["/2024/07/08/orw/index.html","0b6a6e257632ee9352c52419b96b914f"],["/2024/07/19/机器码/index.html","9aa0bddb9120ced17a62d7134952a4f8"],["/2024/07/22/堆/index.html","7933b32b3bca0e77cac394d3490338a5"],["/404.html","955d8c7efeed54b89dd464058b234db2"],["/about/index.html","c56936d3bdc632698741e570078b2fb2"],["/archives/2024/05/index.html","cb9b694d47b1f24320b938f228ce745a"],["/archives/2024/06/index.html","3e2e11934fc7e41f90137bac35d1394f"],["/archives/2024/07/index.html","ecc84a23df2ec482e8a1e011c6a0f3a6"],["/archives/2024/index.html","4523aba3a95d5bc2ae0aaab2a803dada"],["/archives/2024/page/2/index.html","5126d952371d313084f4a3a36734e770"],["/archives/index.html","32b24e598e528c1b663b7136a420b6d9"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/categories/Pwn/index.html","47c676f822ba307cfb12378b0db306fa"],["/categories/index.html","cc8e6c2198e1e415769869a4c106e5a9"],["/categories/杂记/index.html","4dc7930084b810e4df90a58facf2bfd0"],["/css/app.css","3141afff1d3819cee72ddf34ab8acde2"],["/css/comment.css","ee6911ca8a2be92874e90b404f431453"],["/css/custom.css","b43d7bc8184f1352749d941b1cd03bf7"],["/css/mermaid.css","ebd4f9a8ca73d2e7a5e3721f744131d9"],["/friends/index.html","566374e855a238dc3e6a5a49865b1f8b"],["/images/1.jpg","43fe99ebc0100cf4fb591a153b29191f"],["/images/3.jpg","e667c8f0a8d4ae1f333717741267a37c"],["/images/404.png","3232dd055d87d199730907a732036a55"],["/images/algolia_logo.svg","f60fbbe4a8afa312b3f6d12182558861"],["/images/apple-touch-icon.png","19551389f5c16c68678f05c1e4262fe0"],["/images/avatar.jpg","fc97e84ed35a5c395e299f205bbf8383"],["/images/background.jpg","ba7beaa87ee382d5105e63783746c681"],["/images/logo.svg","396ca01fec450b788885ee82bfaa9d12"],["/images/play_disc.png","aa062005bd80fb75a7f094a8d8bec88c"],["/images/play_needle.png","0e1944c070ac083cbf048e3b32480f41"],["/images/search.png","f6dee0d2334d8f0b9842211d2f9e438e"],["/images/wechatpay.png","00b0ff2ef35160d6793f1c925aa9091c"],["/index.html","88c0fffabce6cb0077cc073723361b0b"],["/js/app.js","87a0ee352cc78e1228c2b699b0040226"],["/page/2/index.html","6fd34688f7ee122bb3d49574e686af27"],["/sw-register.js","6485b0a9f6946a00c64b5b1b2393f027"],["/tags/BUU/index.html","5b1b9c35966a84b1af25b6577c1f99dc"],["/tags/heap/index.html","cf2fcc4328d610f42470f3681fe3186c"],["/tags/index.html","4e48047e25a5b1e2aa30e3741eea5037"],["/tags/stack/index.html","73f2ca1533eed122e455efaa6d1d581f"],["/tags/刷题/index.html","aa73958ec450081c3715a16d7ff2f27c"],["/tags/随笔/index.html","64e479c792bfffe250142da71f486142"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
