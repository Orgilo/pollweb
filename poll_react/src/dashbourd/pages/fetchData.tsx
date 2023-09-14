import axios from 'axios'
import { Poll } from '../../../../poll_api/src/poll/entities/poll.entity'
import { instance } from '../../api/axios.api'
import { AddAnswer, IPoll, viewquestion, viewquestions } from '../../types/types'
import { getTokenFromLocalStorage } from '../../helpers/local.strorage.helper'
import { initializeConnect } from 'react-redux/es/components/connect'

export async function saveQuestions(
	questions: viewquestion[],
	poll_id: number
) {
	try {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('No token available')
		}

		const questionsWithPollId = questions.map((question) => ({
			...question,
			poll_id,
		}))

		const response = await axios.post(
			'http://localhost:3000/question',
			questionsWithPollId[0],
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
				},
			}
		)

		return response.data // Return success message or any relevant data
	} catch (error) {
		console.error('Error saving questions:', error)
		throw error // Rethrow the error to be handled in the component
	}
}
export const saveAnswers = async (answers: any) => {
	try {
	  const token = localStorage.getItem('token');
	  if (!token) {
		throw new Error('No token available');
	  }

	  const response = await instance.post('http://localhost:3000/answer', answers, {
		headers: {
			Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
		},
	  });
  
	  return response.data; // Return success message or any relevant data
	} catch (error) {
	  console.error('Error saving answers:', error);
	  throw error; // Rethrow the error to be handled in the component
	}
  };


export const fetchPollDetails = async (id: number): Promise<IPoll | null> => {
	try {
		const response = await instance.get<IPoll>(`/polls/poll/${id}`)
		return response.data
	} catch (error) {
		console.error('Error fetching poll details:', error)
		return null
	}
}

export const fetchRelatedQuestions = async (
	id: number
): Promise<viewquestion[]> => {
	try {
		const response = await instance.get<viewquestion[]>(`/question/${id}`)

		return response.data
	} catch (error) {
		console.error('Error fetching related questions:', error)
		return []
	}
}

  

export const fetchRelatedQuestionss = async (
	id: number
): Promise<viewquestions[]> => {
	try {
		const response = await instance.get<viewquestions[]>(`/question/${id}`)

		return response.data
	} catch (error) {
		console.error('Error fetching related questions:', error)
		return []
	}
}


export async function fetchPolls() {
	try {
		const token = localStorage.getItem('token')
		console.log('Token:', token)
		if (!token) {
			throw new Error('No token available')
		}

		const response = await axios.get('http://localhost:3000/polls', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return response.data as Poll[]
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}

export async function createPoll(newPoll: any) {
	try {
		const token = localStorage.getItem('token')

		if (!token) {
			throw new Error('No token available')
		}

		const response = await axios.post('http://localhost:3000/polls', newPoll, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return response.data as Poll // Return the created poll
	} catch (error) {
		console.error('Error creating poll:', error)
		throw error // Rethrow the error to be handled in the component
	}
}
