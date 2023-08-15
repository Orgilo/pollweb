import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePollDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    explanation: string;
   
    @IsNotEmpty()
    @IsNumber() // Change this annotation to IsNumber
    userId: number;
    
    // You don't need to include `user_id` here because it will be set in the service
}
