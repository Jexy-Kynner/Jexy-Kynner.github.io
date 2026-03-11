/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/05/10/html学习/index.html","3f51486db56492668cf729d81919fbb2"],["/2024/05/10/楔子/index.html","dc7e35beec8a879bbd2e2a1bb6ac4de8"],["/2024/05/11/前置/index.html","6419427555bff439b534c3c79a7a74af"],["/2024/05/22/ROP/index.html","8bd48ff36e0aaa139aec34513ddf4ac3"],["/2024/06/01/BUU_ciscn_2019_n_1/index.html","70b2ec0377ef697d9c10fecf114d0ee1"],["/2024/06/01/BUU_jarvisoj_level0/index.html","4c1265f90ac0b78a383f7d4e416fdd58"],["/2024/06/12/BUU_ciscn_2019_c_1/index.html","fa6a9c7ad83f3c8c1709561ebbfe49cb"],["/2024/06/16/格式化字符串/index.html","af8901a6f98b671e59ab0ce48810ddc6"],["/2024/07/08/orw/index.html","f827e7d1f18aa669d93f482c8cf54e86"],["/2024/07/19/机器码/index.html","7dcf4b97cbae46a618e641c149ac9159"],["/2024/07/22/堆/index.html","528af4cbaba4481d2ba1ee8f0383c0c7"],["/404.html","88508a9a355da43638424b0530fc5c7f"],["/about/index.html","9a328b307e7af4af72753c62faef58d1"],["/archives/2024/05/index.html","13b7e31ed4fffe1a576a223ec5445a8d"],["/archives/2024/06/index.html","7fe60264885ab08aa572a2bf2ef4da9e"],["/archives/2024/07/index.html","569e48f4754eb7c1be44088c63c4a543"],["/archives/2024/index.html","003610df7924266f71a2979ab319d14f"],["/archives/2024/page/2/index.html","81a79ffbb6676f13984ee3121e5dd200"],["/archives/index.html","ccb0b736d0b21b7b5ac5971ebf358a04"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/categories/Pwn/index.html","55a9c0dc724679f58f1c9dfdf3ac7a32"],["/categories/index.html","d87438a41bc6f9dd2e2f80695c12e804"],["/categories/杂记/index.html","0d4c4345e8037dc7d6d8f57ea08a19c1"],["/css/app.css","3141afff1d3819cee72ddf34ab8acde2"],["/css/comment.css","ee6911ca8a2be92874e90b404f431453"],["/css/custom.css","b43d7bc8184f1352749d941b1cd03bf7"],["/css/mermaid.css","ebd4f9a8ca73d2e7a5e3721f744131d9"],["/friends/index.html","89c6fa657a8184e3632542a78933304e"],["/images/1.jpg","43fe99ebc0100cf4fb591a153b29191f"],["/images/3.jpg","e667c8f0a8d4ae1f333717741267a37c"],["/images/404.png","3232dd055d87d199730907a732036a55"],["/images/algolia_logo.svg","f60fbbe4a8afa312b3f6d12182558861"],["/images/apple-touch-icon.png","19551389f5c16c68678f05c1e4262fe0"],["/images/avatar.jpg","fc97e84ed35a5c395e299f205bbf8383"],["/images/background.jpg","ba7beaa87ee382d5105e63783746c681"],["/images/logo.svg","396ca01fec450b788885ee82bfaa9d12"],["/images/play_disc.png","aa062005bd80fb75a7f094a8d8bec88c"],["/images/play_needle.png","0e1944c070ac083cbf048e3b32480f41"],["/images/search.png","f6dee0d2334d8f0b9842211d2f9e438e"],["/images/wechatpay.png","00b0ff2ef35160d6793f1c925aa9091c"],["/index.html","458fda58bfbd74106fec3be3d671a08b"],["/js/app.js","8b9057a22f7b8c83b742aa98e0e24eae"],["/page/2/index.html","52be8c07f4147b64ccb2a17ad835a2c6"],["/sw-register.js","ffcb22ba4b20a9abf9db380b73ec60f7"],["/tags/BUU/index.html","79e9442cbc3e2e4234f35110804d36cf"],["/tags/heap/index.html","f0c4dec2296e51d1d6ba072ef6416c76"],["/tags/index.html","b9c56de20cb6f7381fc198a4de27d394"],["/tags/stack/index.html","4e3feb2285d6bb70592ff958ef7b08e8"],["/tags/刷题/index.html","7a127d1201f1f29e47904eee56cce912"],["/tags/随笔/index.html","c8072b3fbef6cdbb0df5defa5a180c53"]];
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
