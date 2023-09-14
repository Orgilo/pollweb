import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPoll, AddAnswer, viewquestions } from '../types/types';
import { fetchPollDetails, fetchRelatedQuestionss, saveAnswers } from '../dashbourd/pages/fetchData';
import Navbarafter from '../components/navbar2';

const QuestionsPage: FC = () => {
  const [selectedPoll, setSelectedPoll] = useState<IPoll | null>(null);
  const [questions, setQuestions] = useState<viewquestions[]>([]);
  const { pollId } = useParams<{ pollId: string | undefined }>();

  // Use an object to store answers
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    // Update the state with the modified answers object
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.info('answers==>', answers);

      // Format answers to send to the server
      const formattedAnswers = {
        answer: Object.values(answers), // Extract answer values from the object
      };

      // Send answers to the server
      await saveAnswers(formattedAnswers);
      // Handle successful submission
    } catch (error) {
      console.error('Error saving answers:', error);
    }
  };

  useEffect(() => {
    const parsedPollId = pollId ? parseInt(pollId, 10) : null;

    if (parsedPollId !== null) {
      // Fetch poll details
      fetchPollDetails(parsedPollId)
        .then((pollDetails) => {
          setSelectedPoll(pollDetails);
        })
        .catch((error) => {
          console.error('Error fetching poll details:', error);
        });

      // Fetch related questions
      fetchRelatedQuestionss(parsedPollId)
        .then((relatedQuestions) => {
          setQuestions(relatedQuestions);
        })
        .catch((error) => {
          console.error('Error fetching related questions:', error);
        });
    }
  }, [pollId]);
  
  return (
    <div>
      <Navbarafter />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {selectedPoll && (
          <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex justify-center items-center text-white text-xl font-bold mb-4">
              Q
            </div>
            <h2 className="text-2xl font-bold mb-4">{selectedPoll.title}</h2>
            <p className="mb-4">{selectedPoll.explanation}</p>

            <div className="bg-white p-4 rounded shadow-md">
              {questions.map((question: viewquestions, index) => (
                <div key={index} className="mb-4">
                  <div className="border p-4 rounded">
                    <p className="font-bold">{question.title}</p>
                    {question.questiontitle === 'multiple-choice' && (
                      <div>
                        {/* Render radio buttons */}
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="ml-4 mt-2  ">
                            <input type="radio" name={`question-${index}`} value={option.value} onChange={(e) => handleAnswerChange(index, e.target.value)}/>
                            {option.value}
                          </div>
                        ))}
                      </div>
                    )}
                    {question.questiontitle === 'check-box' && (
                      <div>
                        {/* Render checkboxes */}
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="ml-4 mt-2">
                            <input type="checkbox" name={`question-${index}`} value={option.value} onChange={(e) => handleAnswerChange(index, e.target.value)}/>
                            {option.value}
                          </div>
                        ))}
                      </div>
                    )}
                     {question.questiontitle === 'short-text' && (
                       <div className="mt-2">
                       <input
                         type="text"
                         name={`question-${index}`}
                         onChange={(e) => handleAnswerChange(index, e.target.value)}
                       />
                     </div>
                    )}
                    {question.questiontitle === 'long-text' && (
                     <div className="mt-2 border-black">
                     <textarea
                       name={`question-${index}`}
                       rows={4}
                       onChange={(e) => handleAnswerChange(index, e.target.value)}
                     />
                   </div>
                    )}
                     
                    {/* */}
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;