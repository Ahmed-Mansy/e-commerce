import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  { path: 'categories/subCategories/:id/:slug', renderMode: RenderMode.Server },
  { path: 'checkout/:id', renderMode: RenderMode.Server },
  { path: 'details/:slug/:id', renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
