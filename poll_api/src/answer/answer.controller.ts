import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseIntPipe } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAnswerDto: CreateAnswerDto, @Req() req) {
    try {
      const answer = await this.answerService.createAnswer(createAnswerDto, +req.user.id);
      return { message: 'Answer created successfully', answer };
    } catch (error) {
      return { message: 'Error creating answer', error };
    }
  }
  

  @Get('findByAnswer')
  async findByAnswer(@Query('answer') answer: string) {
    return this.answerService.findByAnswer(answer);
  }
  

  @Get()
 
  findAll(@Req() req){
    return this.answerService.findAll()
  }



  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
