import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';

registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new CacheFirst()
);

