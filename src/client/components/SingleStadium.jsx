import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SingleStadium() {
	const [singleStadium, setStadium] = useState();
	const { id } = useParams();

	useEffect(() => {
		async function getSingleStadium(stadiumId) {
			try {
				const response = await fetch(
					`http://localhost:3000/api/stadiums/${stadiumId}`
				);
				const result = await response.json();
				setStadium(result.stadium);
			} catch (error) {
				console.error(error);
			}
		}
		getSingleStadium(id);
	}, [id]);

	return (
		<>
			{singleStadium && (
				<div>
					<h1>{singleStadium.name}</h1>
					<p>{singleStadium.team}</p>
					<p>{singleStadium.location}</p>
					<p>{singleStadium.division}</p>
				</div>
			)}
		</>
	);
}