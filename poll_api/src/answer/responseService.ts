// responseService.ts
import { getRepository } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';

// Define a function to save user responses
async function saveUserResponses(userId: number, pollId: number, responses: { questionId: number; answer: string }[]) {
  const answerRepository = getRepository(Answer);

  // Prepare data for saving
  const answersToSave = responses.map((response) => ({
    user: { id: userId },           // Assuming you have a User entity with an 'id' field
    poll: { id: pollId },           // Assuming you have a Poll entity with an 'id' field
    question: { id: response.questionId }, // Assuming you have a Question entity with an 'id' field
    answer: response.answer,
  }));

  try {
    // Insert user responses into the Answer entity
    await answerRepository.insert(answersToSave);
    console.log('User responses saved successfully!');
    return 'User responses saved successfully!';
  } catch (error) {
    console.error('Error saving user responses:', error.message);
    throw error;
  }
}

export { saveUserResponses };
