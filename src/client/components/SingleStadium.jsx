import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                    <div><Link to={`/`}>Return</Link></div>
                    <br />
                    <img src={singleStadium.image}/>
					<h1>{singleStadium.name}</h1>
					<p>{singleStadium.team}</p>
					<p>{singleStadium.location}</p>
					<p>{singleStadium.division}</p>
                    <div>
                        <h2>Reviews: </h2>
                    {singleStadium.reviews.map((review, index) => {
                        return <li key={index}>{review.text}</li>
                    })}
                    </div>
				</div>
			)}
		</>
	);
}