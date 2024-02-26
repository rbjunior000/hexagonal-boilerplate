import { Server } from './adapters/http';
import { Dependencies, bootstrap as Bootstrap } from './bootstrap';

export const bootstrap = async () => {
  await Bootstrap();
  await Server.start(Dependencies);
};

bootstrap();
