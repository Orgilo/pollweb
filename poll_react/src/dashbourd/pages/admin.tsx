import React, { useEffect, useState } from 'react';
import { Poll } from '../../../../poll_api/src/poll/entities/poll.entity';
import { fetchPolls, createPoll} from './fetchData';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import { instance } from '../../api/axios.api';
import { IPoll, IPolladd } from '../../types/types';
import { Link, useLoaderData } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

interface TableProps {
  data: Poll[];
}
export const pollAction = async({request}:any)=> {
     switch(request.method){
      case 'POST':{
        const formData = await request.formdata()
        const title = {
          title: formData.get('title')
        }
        await instance.post('/polls', title)
        return null
      }
      case 'PATH':{
        return null
      }
      case 'Delete':{

      }
     }
}

export const pollloader = async () => {
   const {data} = await instance.get<IPoll[]>('/polls')
   return data
}

  const Polladmin: React.FC<TableProps> = ({ data }) => {
    const polladmins = useLoaderData() as IPoll[]
    const [list, setList] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
 

  const handleAddButtonClick = () => {
    setOpenModal(true);
  };

  const handleChangeFormTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(event.target.value);
  };

  const handleChangeFormDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormDescription(event.target.value);
  };

  const handleAddQuestion = async () => {
    const newPoll = {
      title: formTitle,
      explanation: formDescription,
    };
  
    try {
      const response = await instance.post<IPolladd[]>('/polls', newPoll);
      const createdPoll = response.data;
  
      // Update the list state to include the new poll
      setList([...list, ...createdPoll]);
  
      // Clear form inputs and close the modal
      setFormTitle('');
      setFormDescription('');
      setOpenModal(false);
      
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };
  

  return (
    <div className='flex flex-row'>
      <div className='flex'>
        <Sidebar />
      </div>
      <div className='flex flex-col '>
        <Header />
        <div className="Box-sc-g0xbh4-0 iJmJly">
        <div className="flex justify-end mb-4 mt-4">
          <button
            className="bg-primary border border-green-500 text-black py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
            onClick={handleAddButtonClick}
          >
            Add Data
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Poll ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Explanation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {polladmins.map((poll, idx) => (
              <tr key={poll.id}>
                <td className="px-6 py-4 whitespace-nowrap">{poll.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{poll.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {poll.explanation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(poll.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(poll.updatedAt).toLocaleString()}
                </td>
                
                <td ><Link to={`/Polldetials/${poll.id}`}> <AiOutlineEye className="m-10" /> </Link> </td>
              </tr>
            ))}
          </tbody>
        </table>
        {openModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="p-4  bg-gray-300 rounded-lg shadow-lg w-max ">
                <input
                  type="text"
                  className="w-full p-2 rounded-md border"
                  placeholder="Маягтын нэрийг өгнө үү"
                  value={formTitle}
                  onChange={handleChangeFormTitle}
                />
                <textarea
                  className="mt-2 w-full p-2 rounded-md border min-h-[120px] w-200 "
                  placeholder="Маягтын тодорхойлолт"
                  rows={3}
                  value={formDescription}
                  onChange={handleChangeFormDescription}
                />
                <div className='flex justify-between'>
                  <button
                    className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    onClick={() => setOpenModal(false)}
                  >
                    Болих.
                  </button>
                  <button

                    className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={handleAddQuestion}
                
                  >
                    Асуулт нэмэх
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Polladmin;
