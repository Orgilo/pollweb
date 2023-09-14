import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import { useLoaderData, useParams } from 'react-router-dom';
import { IPoll, viewquestion,AddAnswer, IresponseQuestionLoader, IresponseAnswerLoader } from '../../types/types';
import { fetchPollDetails, fetchRelatedQuestions } from './fetchData';
import QuestionForm from '../../components/Poll';
import Chart from '../../components/chart';
import { instance } from '../../api/axios.api';



export const Pollloader = async () =>{
  const question = await instance.get<viewquestion[]>("/question")
  const answer = await instance.get<AddAnswer[]>("/answer")

  const data = {
    options: question.data,
    answer: answer.data,

  }
  return data
}

export const PollAction = async ({request}: any) =>{
  const data = {}
  return data
}

const Polldetials: FC = () => {
  const {options} = useLoaderData() as IresponseQuestionLoader
  const {answer}= useLoaderData() as IresponseAnswerLoader

  const { pollId } = useParams<{ pollId?: string }>();
  const [openModal, setOpenModal] = useState(false);
  
  const [selectedPoll, setSelectedPoll] = useState<IPoll | null>(null);
  
  const [questions, setQuestions] = useState<viewquestion[]>([]);


  const parsedPollId = pollId ? parseInt(pollId, 10) : null;
  



  useEffect(() => {
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
      fetchRelatedQuestions(parsedPollId)
        .then((relatedQuestions) => {
          setQuestions(relatedQuestions);
        })
        .catch((error) => {
          console.error('Error fetching related questions:', error);
        });
        
    }
  }, [pollId]);

  const handleAddButtonClick = () => {
    setOpenModal(true);
  };


  return (
    <div className='min-h-screen overflow-x-hidden'>
        <Header />
        <div className='mr-20 flex'>
          <Sidebar />
          <div className='flex flex-1 justify-center'>
         
          {selectedPoll ? (
            
                <div className='flex mt-4  md:gap-x-[24px] p-4 w-full '>
                  
                  <div className='relative  font-mono text-black text-sm font-bold leading-6 h-60 w-96 border bg-slate-300 mt-2 p-4 '>
                    <div className='font-bold Arial text-xl'> <b>Санал асуулт</b><hr className='border-black'></hr> </div>
                     <div className=' Arial text-base'> <b>Нэр: </b>
                      <br></br>{selectedPoll.title} </div>
                    <div> 
                      
                    <hr className='border-black '></hr>
                <b>  Cанал асуулгийн тодорхойлолт: </b><br></br>
                  
                  {selectedPoll.explanation}
                  </div>
                
                  </div>
                  
                  <div className='w-full'>
  {questions.length === 0 ? (
    <div className='relative font-mono text-black text-sm font-bold leading-6 h-60 border bg-slate-300 mt-4 p-4'>
      <div className='mx-auto flex justify-between items-center'>
        <b className='text-2xl text-red-400'>Хариулт</b>
        <div className='flex justify-end mb-4 mt-4'>
          
        </div>
      </div>
      <hr className='mt-2 border-black'></hr>
      <p>No questions available.</p>
    </div>
  ) : (
    questions.map((question, index) => {
     
    
  return  (

      <div key={index} className='relative font-mono text-black text-sm font-bold leading-6 h-60 border bg-slate-300 mt-4 p-4' >
        <div className='mx-auto flex justify-between items-center'>
          <b className='text-2xl text-red-400 '>Хариулт</b>
          <div className='flex justify-end mb-4 mt-4'>
            {/* ... */}
          </div>
        </div>
        <hr className='mt-2 border-black'></hr>
        <b>Асуултын нэр :</b>
        <p>{question.title}</p>
        <hr className='mt-2 border-black'></hr>
        <b>Асуулт :</b>
        <p>{question.qanswer}</p>
        {
          question.options.map((item:any,index:number)=>{
            return(
                <p key={index}>{item.value}</p>
            )
          })
        }
        
        
       
  <div>
    <b>Сонголт:</b>
    <p>{question.questiontitle }
    </p>

  </div>
  <div>
  <b>Chart:</b>
  {/* <Chart options={['Option1', 'Option2', 'Option3']} answer={['Answer1']} /> */}
  </div>
  
      </div>
     );
    })
  )}
</div>

       <div>
        <div className=' justify-between'>
        <button
          className="bg-blue-500 mt-2 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleAddButtonClick}>
          Асуулт нэмэх 
        </button>
        <button
          className="bg-green-500 mt-4 hover:bg-green-600 text-white py-2 px-4 rounded">
          Нийтлэх 
        </button>
      </div> 
        </div>
        {openModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="p-4  bg-gray-300 rounded-lg shadow-lg w-max ">
            <QuestionForm poll_id={parsedPollId} closeModal={() => setOpenModal(false)} selectedPoll={selectedPoll} />

             
             <button
                    className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    onClick={() => setOpenModal(false)}
                  >
                    Болих.
                  </button>
            </div>
          </div>
          )}
                  
                  </div>
              ) : (
                <p>Loading poll details...</p>
              )}
           
        </div>
        </div>
    </div>
  );
};

export default Polldetials;
