/* eslint-disable */
import Swal from 'sweetalert2';
export const errorCatcher = (err) => {
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
			title: 'Oops...',
			text: 'Something went wronge!',
		});
	}
}