import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';


@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);
  constructor(
    @InjectRepository(Question)
    private readonly QuestionRepository: Repository<Question>,
  ){}
  
  async createQuestion(createQuestionDto: CreateQuestionDto, id: number) {
    
    const newQuestion = {
      questiontitle: createQuestionDto.questiontitle,
      qanswer: createQuestionDto.qanswer,
      title: createQuestionDto.title,
      options: createQuestionDto.options ,
      poll: { id: +createQuestionDto.poll_id },
      user: { id },
    };
    if (!newQuestion) {
      throw new BadRequestException('Ямар нэг зүйл буруу байна.')
    }

    return await this.QuestionRepository.save(newQuestion) 
  }

  async findAll(id: number){
     const questions = await this.QuestionRepository.find({
      where:{
        user:{id},
      },
      order:{
        
      }
     })
     return questions
  }

  async findOne(id: number) {
    const question = await this.QuestionRepository.findOne({
      where:{
           id,
      },
      relations:{
        user: true,
        poll: true,
      },
    })
    if (!question) throw new NotFoundException('Асуулт олдсонгүй')
    return question
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }


  async findAllWithPagination(id: number, page: number, limit: number){
    const questions = await this.QuestionRepository.find({
      where: {
        user: {id},
      },
      relations: {
        poll: true,
        user: true
      },
      order: {
      },
      take: limit,
      
      skip: (page - 1) * limit

    })
    return questions
  }  


  async findQuestionsByPollId(poll_id: number): Promise<Question[]> {
    try {
      const questions = await this.QuestionRepository.find({
        where: {
          poll: { id: poll_id },
        },
      });

      this.logger.debug(`Retrieved questions for poll_id: ${poll_id}`);
      return questions;
    } catch (error) {
      this.logger.error(`Error fetching questions for poll_id ${poll_id}: ${error.message}`);
      throw error;
    }
  }
  
 // async findALLByType(id: number, type: string) {
  //  const questions = await this.QuestionRepository.find({
  //    where: {
   //     user: { id },
   //      type, // Use the correct property name (replace `qtype` with the actual property name)
   //   },
   // });
   // const total = questions.reduce((acc, obj) => acc + obj.questiontitle, 0);
   // return total;
  }
