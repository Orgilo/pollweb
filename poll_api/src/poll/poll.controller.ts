import { Controller, Post, Body, UseGuards, Request,Get, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Update the import path
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { Poll } from './entities/poll.entity';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @UseGuards(JwtAuthGuard)// Protect the route with JwtAuthGuard

  async createPoll(@Body() createPollDto: CreatePollDto, @Request() req) {
    // The authenticated user's information is available in req.user
    const userId = req.user.id; // Assuming your user object has an 'id' field

    // Now you have the userId, associate it with the poll creation process
    createPollDto.userId = userId;
    
    // Call your pollService to create the poll with the associated userId
    return this.pollService.createPoll(createPollDto);
  }
  
  @Get() // Define a GET route to fetch polls
  @UseGuards(JwtAuthGuard)
  async getPolls(): Promise<Poll[]> {
    return this.pollService.findAll(); // Assuming you have a method findAll() in PollService
  }
   
  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id:string){
    return this.pollService.remove(+id)
  }

  @Get(':type/:id')
  // @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    console.log('===============> controller id', id)

    return this.pollService.findOne(+id);
  }
 

}
