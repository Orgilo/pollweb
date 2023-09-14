import { FC, useState, ChangeEvent } from 'react';
import { FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';
import clsx from 'clsx';
import { viewquestion, IPoll } from '../types/types';
import { saveQuestions } from '../dashbourd/pages/fetchData';





const QuestionForm: FC<{ poll_id: number | null; closeModal: () => void; selectedPoll: IPoll | null }> = ({ poll_id, selectedPoll }) => {


  const [questions, setQuestions] = useState<viewquestion[]>([
    {
      title: '',
      qanswer: '',
      questiontitle: '',
      options: [],
    },
  ])

  const handleAddQuestion = () => {
    setQuestions([...questions, {title: '', qanswer: '', questiontitle: '', options: [] }]);
  
  };



  const handleChangeQuestion = (index: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].qanswer = event.target.value;
    setQuestions(updatedQuestions);
  };
  const handleChangeQuestions = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].qanswer = event.target.value;
    setQuestions(updatedQuestions);
  };

  

  const handleChangeOption = (
    questionIndex: number,
    optionIndex: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] ={ value: event.target.value };
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ value: '' }); // Add an empty option object
    setQuestions(updatedQuestions);
  };
  
  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="p-4">
      
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="my-4 border p-4 rounded-md bg-slate-300">
          <div className="flex items-center justify-between">
            <input
              type="text"
              className="w-2/3 p-2 mt-2 rounded-md border"
              placeholder="Асуултаа бичнэ үү"
              value={question.title}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[questionIndex].title = e.target.value;
                setQuestions(updatedQuestions);
              }}
              
            />
            <select
              className="w-400px mt-2 p-2 rounded-md border"
              value={question.questiontitle}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[questionIndex].questiontitle = e.target.value;
                setQuestions(updatedQuestions);
              }}
            >
              <option value="long-text">Урт хариулт</option>
              <option value="short-text">Богино хариулт</option>
              <option value="multiple-choice">Олон хариулт</option>
              <option value="check-box">Чек бокс</option>
            </select>
            <button
              className=" mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded flex justify-center items-center" 
              onClick={() => handleRemoveQuestion(questionIndex)}
            >
              <FaTrashAlt className="mr-1" />Устгах
            </button>
          </div>
          
          <textarea
          
            className={clsx(
              'w-full p-2 mt-4 rounded-md border min-h-[150px]',
              question.questiontitle !== 'long-text' && 'hidden'
            )}
            placeholder="Тайлбар..."
            maxLength={1000}
            value={question.qanswer}
            onChange={(e) => handleChangeQuestion(questionIndex, e)}
          />
          <input
            type="text"
            className={clsx(
              'w-full p-2 mt-4 rounded-md border',
              question.questiontitle !== 'short-text' && 'hidden'
            )}
            placeholder="Тайлбар..."
            maxLength={100}
            value={question.qanswer}
            onChange={(e) => handleChangeQuestions(questionIndex, e)}
          />

          
          {['multiple-choice', 'check-box'].includes(question.questiontitle) && (
            <div>
              {question.options.map((option, optionIndex) => (
  <div key={optionIndex} className="flex items-center mt-2">
    <input
      type={question.questiontitle === 'multiple-choice' ? 'radio' : 'checkbox'}
      className="mr-2"
    />
    <input
      type="text"
      className="w-full p-2 rounded-md border"
      placeholder={`Хариултыг бичнэ үү ${optionIndex + 1}`}
      value={option.value} // Access the 'value' property
      onChange={(e) => handleChangeOption(questionIndex, optionIndex, e)}
    />
                  {question.options.length > 1 && (
      <button
        className="ml-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => handleRemoveOption(questionIndex, optionIndex)}
      >
        <FaTimes className="m-1 " />
      </button>
    )}
                </div>
              ))}
              <button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded flex justify-center items-center"
                onClick={() => handleAddOption(questionIndex)}
              >
               <FaPlus className="mr-2" /> Хариулт нэмэх
              </button>
            </div>
          )}
        </div>
      ))}
      <div className='flex justify-between'>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleAddQuestion}>
          Асуулт нэмэх 
        </button>
        <button
  className="bg-green-500 mt-4 hover:bg-green-600 text-white py-2 px-4 rounded"
  onClick={async () => { // Mark the function as async
    try {
      // Restructure options data to match server's expectations
      const questionsWithOptions = questions.map(q => ({
        ...q,
        options: q.options.filter(opt => opt.value !== '') // Remove empty options
      }));
      await saveQuestions(questionsWithOptions, selectedPoll?.id || 0);
      console.log('Questions saved successfully.');
    } catch (error) {
      console.error('Error saving questions:', error);
    }
  }}
>
  Нийтлэх
</button>
      </div>
    </div>
  );
};

export default QuestionForm;
