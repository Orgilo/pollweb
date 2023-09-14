import { Controller, Get, Post, Query, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';


@Controller('question')
export class QuestionController {
  
  constructor(private readonly questionService: QuestionService) {}
  @Post() 
// @UsePipes(new ValidationPipe())
@UseGuards(JwtAuthGuard)
create(@Body() createQuestionDto: CreateQuestionDto, @Req() req) {
  // createQuestionDto.options = JSON.stringify(createQuestionDto.options);
  return this.questionService.createQuestion(createQuestionDto, +req.user.id);
  }


//  @Get(':type/find')
 //@UseGuards(JwtAuthGuard)
 //findALLByType(@Req() req, @Param('type') type:string){
 // return this.questionService.findALLByType(+req.user.id, type)
 //}

   // url/questions/pagination/page=1&limit=3
   @Get('pagination')
   @UseGuards(JwtAuthGuard)
   findAllWithPagination(
     @Req()req,  
     @Query('page') page:number = 1, 
     @Query('limit') limit:number = 3,){ 
     return this.questionService.findAllWithPagination(+req.user.id, +page, +limit)
   }
 


  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req){
    return this.questionService.findAll(+req.user.id)
  }

  //url/question/questions/1
  //url/Poll/Polls/1
  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
 
  @Get('/:id')
  @UseGuards(JwtAuthGuard) // Apply the guards as needed
  async getQuestionsByPollId(@Param('id') poll_id: number) {
    const questions = await this.questionService.findQuestionsByPollId(poll_id);

    return questions;
  }
}
