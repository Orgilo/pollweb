export class CreateQuestionDto {
  //  @IsString()
  //  @IsNotEmpty()
    questiontitle: string
    
   // @IsString()
   // @IsNotEmpty()
    qanswer: string

   // @IsString()
   // @IsNotEmpty()
    title: string;

   
   // @IsNotEmpty()
   options: Record<string, any>;
 // Use a key-value object type
    
    poll_id: number
  
}
