import { Injectable, NotFoundException, Optional } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePollDto } from "./dto/create-poll.dto";
import { Poll } from "./entities/poll.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class PollService {
    constructor(
        @InjectRepository(Poll)
        
        private readonly pollRepository: Repository<Poll>,
        @Optional() private readonly userService: UserService,
    ) {}

    async createPoll(createPollDto: CreatePollDto) {
        const user = await this.userService.findById(createPollDto.userId);
        const poll = new Poll();
        poll.title = createPollDto.title;
        poll.explanation = createPollDto.explanation;
        poll.user = user;

        return this.pollRepository.save(poll);
    }

    
    async findAll(): Promise<Poll[]> {
        return this.pollRepository.find(); // Use the find method to get all polls
    }

    async remove(id: number) {
        const poll = await this.pollRepository.findOne({
            where: { id },
        });
        if (!poll) {
            throw new NotFoundException('Санал асуулга олдсонгүй!');
        }
        return await this.pollRepository.delete(id);
    }

  
    async findOne(id: number) {
        const poll = await this.pollRepository.findOne({
            where:{
                id,
            },
           relations: ['user']
        })
        return poll
      }


    
}
