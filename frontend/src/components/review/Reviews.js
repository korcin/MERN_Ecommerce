import React from "react"

const Reviews = ({ reviews }) => {
	return (
		<div className='reviews w-75'>
			<h3>Opinie użytkowników:</h3>
			<hr />
			{reviews &&
				reviews.map(review => (
					<div key={review._id} class='review-card my-3'>
						<div class='rating-outer'>
							<div
								class='rating-inner'
								style={{ width: `${(review.rating / 5) * 100}%` }}></div>
						</div>
						<p class='review_user'>{review.name}</p>
						<p class='review_comment'>{review.comment}</p>

						<hr />
					</div>
				))}
		</div>
	)
}

export default Reviews
