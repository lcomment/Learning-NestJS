import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { SocketIoAdapter } from './adapters/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useWebSocketAdapter(new WsAdapter(app)); → Websocket에서 Socket.io로 변경
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../views'));
  app.setViewEngine('ejs');

  await app.listen(3000);
  //console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();