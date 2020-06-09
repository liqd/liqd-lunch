import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate()
);

