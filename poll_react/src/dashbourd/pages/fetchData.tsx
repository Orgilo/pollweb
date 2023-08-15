import axios from 'axios';
import { Poll } from '../../../../api/src/poll/entities/poll.entity'; 

export async function fetchPolls() {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.get('http://localhost:3000/polls', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Poll[];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function createPoll(newPoll: any) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.post('http://localhost:3000/polls', newPoll, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Poll; // Return the created poll
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error; // Rethrow the error to be handled in the component
  }
}
