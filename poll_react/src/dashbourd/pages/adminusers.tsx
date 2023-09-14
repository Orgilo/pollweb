import React, { useEffect, useState } from 'react';
import { instance } from '../../api/axios.api';
import { IUserDatas } from '../../types/types';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

interface TableProps {
  data: IUserDatas[];
}

const Useradmin: React.FC<TableProps> = ({ data }) => {

    const [user, setUser] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/user');
        setUser(response.data)
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-row'>
      <div className='flex'>
        <Sidebar />
      </div>
      <div className='flex flex-col '>
        <Header />
        <div className="Box-sc-g0xbh4-0 iJmJly">
          <div className="flex justify-end mb-4 mt-4"></div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
  {user.length > 0 ? (
    user?.map((item: any) => (
      <tr key={item?.id}>
        <td className="px-6 py-4 whitespace-nowrap">{item?.id}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item?.username}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item?.firstName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item?.lastName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td >No data available</td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Useradmin;
