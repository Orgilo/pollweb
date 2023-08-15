import { FC, useState, ChangeEvent } from 'react';
import { FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';
import clsx from 'clsx';

interface Question {
  type: string;
  question: string;
  options: string[];
}

const QuestionForm: FC = () => {
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: 'short-text', question: '', options: [] }]);
  };

  const handleChangeFormTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setFormTitle(event.target.value);
  };

  const handleChangeFormDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormDescription(event.target.value);
  };

  const handleChangeQuestion = (index: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };
  const handleChangeQuestions = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };


  const handleChangeOption = (questionIndex: number, optionIndex: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
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
      <div className="my-4 p-4 border bg-slate-300 rounded-lg">
        <input
          type="text"
          className="w-full p-2 rounded-md border" 
          placeholder="Маягтын нэрийг өгнө үү"
          value={formTitle}
          onChange={handleChangeFormTitle}
        />
        <textarea
          className="mt-2 w-full p-2 rounded-md border min-h-[120px]"
          placeholder="Маягтын тодорхойлолт"
          rows={3}
          value={formDescription}
          onChange={handleChangeFormDescription}
        />
      </div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="my-4 border p-4 rounded-md bg-slate-300">
          <div className="flex items-center justify-between">
            <input
              type="text"
              className="w-2/3 p-2 mt-2 rounded-md border"
              placeholder="Асуултаа бичнэ үү"
            />
            <select
              className="w-400px mt-2 p-2 rounded-md border"
              value={question.type}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[questionIndex].type = e.target.value;
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
              question.type !== 'long-text' && 'hidden'
            )}
            placeholder="Тайлбар..."
            maxLength={1000}
            value={question.question}
            onChange={(e) => handleChangeQuestion(questionIndex, e)}
          />
          <input
            type="text"
            className={clsx(
              'w-full p-2 mt-4 rounded-md border',
              question.type !== 'short-text' && 'hidden'
            )}
            placeholder="Тайлбар..."
            maxLength={100}
            value={question.question}
            onChange={(e) => handleChangeQuestions(questionIndex, e)}
          />

          
          {['multiple-choice', 'check-box'].includes(question.type) && (
            <div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mt-2">
                  <input
                    type={question.type === 'multiple-choice' ? 'radio' : 'checkbox'}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border"
                    placeholder={`Хариултыг бичнэ үү ${optionIndex + 1}`}
                    value={option}
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
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          Нийтлэх
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
