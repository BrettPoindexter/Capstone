import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Block } from '@mui/icons-material';

export default function CommentsButton({handleSubmit}) {
	return (
		<Stack direction='row' spacing={2}>
			<Button
				type='submit'
				variant='contained'
				endIcon={<SendIcon />}
				fullWidth
				fontWeight='bold'
				onClick={handleSubmit}
			>
				Post
			</Button>
		</Stack>
	);
}
