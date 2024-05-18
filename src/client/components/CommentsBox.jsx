import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  const [newReview, setReview] = useState('');
  const [newFoodRating, setNewFoodRating] = useState('')
  const [newSceneryRating, setNewSceneryRating] = useState('')
  const [newPricingRating, setNewPricingRating] = useState('')
	return (
		<Box
			component='form'
			sx={{
				'& .MuiTextField-root': { m: 1 },
			}}
			noValidate
			autoComplete='off'
		>
			<div>
				<TextField
					id='standard-textarea'
					placeholder='Any thoughts on this?'
					multiline
					variant='standard'
					fullWidth
					required
				/>
				<TextField
					type='text'
					value={newReview}
					onChange={(e) => setReview(e.target.value)}
					placeholder='Enter review here'
				/>
				<TextField
					type='number'
					value={newFoodRating}
					onChange={(e) => setNewFoodRating(e.target.value)}
					id='food'
				/>
				<TextField
					type='number'
					value={newPricingRating}
					onChange={(e) => setNewPricingRating(e.target.value)}
					id='pricing'
				/>
				<TextField
					type='number'
					value={newSceneryRating}
					onChange={(e) => setNewSceneryRating(e.target.value)}
					id='scenery'
				/>
			</div>
		</Box>
	);
}
