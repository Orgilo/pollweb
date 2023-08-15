import { Inject, Module } from '@nestjs/common';

import { AppService } from './app.service';
import { PollModule } from './poll/poll.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';
import { RoleModule } from './role/role.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';




@Module({
  imports: [
    UserModule, 
    PollModule, 
    
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
       type: 'postgres',
       host: configService.get('DB_HOST'),
       port: configService.get('DB_PORT'),
       username: configService.get('DB_USERNAME'),
       password: configService.get('DB_PASSWORD'),
       database: configService.get('DB_NAME'),
       synchronize: true,
       entities: [__dirname + '/**/*.entity{.js, .ts}'],
       logging: true

      }),
      
      inject: [ConfigService],
    }),
    
    PassportModule.register({ session: true }), // Enable session support
    AnswerModule,
    QuestionModule,
    RoleModule,
    TypeOrmModule.forFeature([User]),
    AuthModule,
  
   
    
  ],

  providers: [AppService],
})
export class AppModule {}
