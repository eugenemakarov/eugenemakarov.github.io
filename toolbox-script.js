toolbox.router.get(/jsonplaceholder\.typicode\.com\/users/, toolbox.cacheFirst);
toolbox.router.get(/jsonplaceholder\.typicode\.com\/posts/, toolbox.networkOnly);