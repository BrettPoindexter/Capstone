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
			</div>
		</Box>
	);
}
