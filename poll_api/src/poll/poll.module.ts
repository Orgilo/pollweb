import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PollController } from "./poll.controller";
import { PollService } from "./poll.service";
import { Poll } from "./entities/poll.entity";
import { UserModule } from "src/user/user.module"; // Update the path accordingly

@Module({
    imports: [
        TypeOrmModule.forFeature([Poll]),
        UserModule, // Add the UserModule here
    ],
    controllers: [PollController],
    providers: [PollService],
})
export class PollModule {}
