/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/05/10/html学习/index.html","7a06901e250e5100391127b2b9d03820"],["/2024/05/10/楔子/index.html","deed92721859babf4f6c8f31a54bf5a7"],["/2024/05/11/前置/index.html","f00492d25652b8549494e2e6692b121a"],["/2024/05/22/ROP/index.html","c3852671bf9cc2d901e67fc9bb210054"],["/2024/06/01/BUU_ciscn_2019_n_1/index.html","2b104808145ed793988a890a3e41e8b7"],["/2024/06/01/BUU_jarvisoj_level0/index.html","58020543b92f5924d8a18102b1e378bb"],["/2024/06/12/BUU_ciscn_2019_c_1/index.html","6b13b54ee5a8ea5bf0e29ab8c5ca4f17"],["/2024/06/16/格式化字符串/index.html","6eac6e9ba082f97a0dd12edbcc64bdc5"],["/2024/07/08/orw/index.html","12f140e0f6d53e8b6f694e7b4a8ecdcc"],["/2024/07/19/机器码/index.html","f5a7f7c922425aa273f805c4430a407a"],["/2024/07/22/堆/index.html","3e4ceb1acb4fc1bd2d5823dd57d3aa4f"],["/404.html","f63dabe3a3cafab2ffe66ea1217819f9"],["/about/index.html","69d68b440a32b8c15895ca169a45eb11"],["/archives/2024/05/index.html","ad73e9a2798d773dcdff2c459e0071ad"],["/archives/2024/06/index.html","e0e57a1f0782cf907977b61910d6db92"],["/archives/2024/07/index.html","5c863b105830ba67a404a91b7821e074"],["/archives/2024/index.html","0aeff056da414c989d8e9eb853541a9e"],["/archives/2024/page/2/index.html","559d08d734ce5b4ee61c57ee4943195a"],["/archives/index.html","4489edfd944750571a70ad589557dcad"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/categories/Pwn/index.html","d085b96249ca385d3c86b48a9e2e6373"],["/categories/index.html","58c8bfcf3dc0a0254218ea6187d37207"],["/categories/杂记/index.html","53b60b54a98e1b84a9e2b88cc2d40fc1"],["/css/app.css","3141afff1d3819cee72ddf34ab8acde2"],["/css/comment.css","ee6911ca8a2be92874e90b404f431453"],["/css/custom.css","b43d7bc8184f1352749d941b1cd03bf7"],["/css/mermaid.css","ebd4f9a8ca73d2e7a5e3721f744131d9"],["/friends/index.html","d3a0d8cfb8b750552ba92aaef6ef79d7"],["/images/1.jpg","43fe99ebc0100cf4fb591a153b29191f"],["/images/3.jpg","e667c8f0a8d4ae1f333717741267a37c"],["/images/404.png","3232dd055d87d199730907a732036a55"],["/images/algolia_logo.svg","f60fbbe4a8afa312b3f6d12182558861"],["/images/apple-touch-icon.png","19551389f5c16c68678f05c1e4262fe0"],["/images/avatar.jpg","fc97e84ed35a5c395e299f205bbf8383"],["/images/background.jpg","ba7beaa87ee382d5105e63783746c681"],["/images/logo.svg","396ca01fec450b788885ee82bfaa9d12"],["/images/play_disc.png","aa062005bd80fb75a7f094a8d8bec88c"],["/images/play_needle.png","0e1944c070ac083cbf048e3b32480f41"],["/images/search.png","f6dee0d2334d8f0b9842211d2f9e438e"],["/images/wechatpay.png","00b0ff2ef35160d6793f1c925aa9091c"],["/index.html","00d3b58b57906b91a8ab32c9142a091f"],["/js/app.js","d41d8cd98f00b204e9800998ecf8427e"],["/page/2/index.html","b9bbe4190241a399822025631d497b03"],["/sw-register.js","6d823081ca1d18c5b871e77197e42e1e"],["/tags/BUU/index.html","14a505690dff1944640d7b59c12dc798"],["/tags/heap/index.html","e6d172d714cf8ef2c89880ebf44f83c1"],["/tags/index.html","a6a1e12f20934236be2b7c8aa1181fd6"],["/tags/stack/index.html","163456026b065556df9d0ee83f2a432e"],["/tags/刷题/index.html","dfb3df2ca984206d87ce2bffa4d6a483"],["/tags/随笔/index.html","ea80748936a2e5886f0f2c0c35ec533e"]];
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
