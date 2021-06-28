/* eslint-disable */
import Swal from 'sweetalert2';
export const errorCatcher = (err) => {
	if(err.errors) {
	try {
		Object.keys(err.errors).map((errors, index) => {
			if (index < 1) {
				if (typeof (err.errors[errors]) === 'object') {
					Swal.fire({
						icon: 'error',
						text: err.errors[errors][0],
					});
				} else {
					Swal.fire({
						icon: 'error',
						text: err.errors[errors],
					});
				}
			}
			return true;
		});
	} catch {
		Swal.fire({
			icon: 'error',
			title: '',
			text: 'Something went wrong!',
		});
	}}
	else if (err.message){
		Swal.fire({
			icon: 'error',
			
			text: err.message,
		});
	} else{
		Swal.fire({
			icon: 'error',
			title: '',
			text: 'Something went wrong!',
		});
	}
}
