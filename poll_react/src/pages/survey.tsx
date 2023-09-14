import { FC, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import { IPoll } from '../types/types'
import { instance } from '../api/axios.api'
import Navbarafter from '../components/navbar2'

export const pollloader = async () => {
	const { data } = await instance.get<IPoll[]>('/polls')
	return data
}

const Survey: FC = () => {
	const [polls, setPolls] = useState<IPoll[]>([])
  
	useEffect(() => {
		async function fetchPolls() {
			const fetchedPolls = await pollloader()
			setPolls(fetchedPolls)
		}
		fetchPolls()
	}, [])

  

	return (
		<div>
			<Navbarafter />
			<div className=" justify-center items-center h-screen bg-gray-100 mt-2 p-2">
				{polls.map((poll) => (
					<div
						key={poll.id}
						className="flex justify-center items-center flex-col w-5/6 mx-auto bg-white p-8 rounded shadow-md mt-2  "
					>
						<h2 className="text-2xl font-bold mb-4 ">{poll.title}</h2>
						<Link to={`/QuestionsPage/${poll.id}`}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Санал асуулга өгөх
              </button>
            </Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default Survey
