
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/e-commerce/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/e-commerce/home",
    "route": "/e-commerce"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/login"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/register"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/forgot"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/home"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/products"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/cart"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/categories"
  },
  {
    "renderMode": 0,
    "route": "/e-commerce/categories/subCategories/*/*"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/brands"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/allorders"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/wishlist"
  },
  {
    "renderMode": 0,
    "route": "/e-commerce/checkout/*"
  },
  {
    "renderMode": 0,
    "route": "/e-commerce/details/*/*"
  },
  {
    "renderMode": 2,
    "route": "/e-commerce/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 25943, hash: '0e359ef10eb469aa44e11e62f1570dd3f79be126ace7eec6bdee0487de33c698', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14916, hash: '795109c5245c03bf25f502d4765ca8f5297f2ea7e28e1b1c7fc70b43d3f645a3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'categories/index.html': {size: 54136, hash: '05c19514f9288cf0178f41bf046fddd20b8871948e2e28a50144bb20ed933a62', text: () => import('./assets-chunks/categories_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 54136, hash: '05c19514f9288cf0178f41bf046fddd20b8871948e2e28a50144bb20ed933a62', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 54136, hash: '05c19514f9288cf0178f41bf046fddd20b8871948e2e28a50144bb20ed933a62', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'forgot/index.html': {size: 54757, hash: '0920e6dbc117fb2c567ea3cfb8f5e180bd78c7fccc78bb646ca20723abdda2ae', text: () => import('./assets-chunks/forgot_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 55153, hash: 'c39d7b6117e2f9d94035ce8eaba8a65fe4e87adcc45d7b409a729144f8c4a05f', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 54136, hash: '05c19514f9288cf0178f41bf046fddd20b8871948e2e28a50144bb20ed933a62', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'allorders/index.html': {size: 54136, hash: '05c19514f9288cf0178f41bf046fddd20b8871948e2e28a50144bb20ed933a62', text: () => import('./assets-chunks/allorders_index_html.mjs').then(m => m.default)},
    'products/index.html': {size: 54136, hash: '05c19514f9288cf0178f41bf046fddd20b8871948e2e28a50144bb20ed933a62', text: () => import('./assets-chunks/products_index_html.mjs').then(m => m.default)},
    'brands/index.html': {size: 54136, hash: '05c19514f9288cf0178f41bf046fddd20b8871948e2e28a50144bb20ed933a62', text: () => import('./assets-chunks/brands_index_html.mjs').then(m => m.default)},
    'wishlist/index.html': {size: 54137, hash: '6f62c4530fccf198fe19857844a0eeb0b3b0306914f5104ea4be228c3bc6b159', text: () => import('./assets-chunks/wishlist_index_html.mjs').then(m => m.default)},
    'styles-ZTXRRO7T.css': {size: 204191, hash: '7z86qgGOWfQ', text: () => import('./assets-chunks/styles-ZTXRRO7T_css.mjs').then(m => m.default)}
  },
};
