import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';



@Injectable()

export class AnswerService {

  constructor(
  @InjectRepository(Answer)
  private readonly answerRepository: Repository<Answer>,
) {}


async createAnswer(createAnswerDto: CreateAnswerDto, id: number) {
    
   const newAnswer = {
    
     answer: createAnswerDto.answer,
   
     user: { id },
   
  };
   if (!newAnswer) {
     throw new BadRequestException('Ямар нэг зүйл буруу байна.')
   }
   return await this.answerRepository.save(newAnswer) 

}


 
async findAll(){
  const answer = await this.answerRepository.find({
   where:{
     
   },
   order:{
        
   }
  })
  return answer
}


async findAllForQuestion(question_id: number) {
  return await this.answerRepository.find({
    where: {
      
    },
  });
}


async findOne(id: number) {
   const answers = await this.answerRepository.findOne({
    where:{
      id,
    }
   })
   if (!answers) throw new NotFoundException ('Хариулт олдсонгүй')
   return answers 
  }

  async findByAnswer(answer: string) {
  return this.answerRepository.find({ where: { answer } });
}


  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }

  
}
