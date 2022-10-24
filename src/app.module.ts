import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { PublisherModule } from './publisher/publisher.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from './core/config/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './core/guards/jwt.guard';
import { RoleGuard } from './core/guards/role.guard';
import { SocketGateway } from './socket/socket.gateway';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
        };
      },
    }),
    UserModule,
    PublisherModule,
    BookModule,
    SocketGateway,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
