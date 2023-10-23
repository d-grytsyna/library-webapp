package com.libraryapp.springbootlibrary.service;

import com.libraryapp.springbootlibrary.dao.BookRepository;
import com.libraryapp.springbootlibrary.dao.ReviewRepository;
import com.libraryapp.springbootlibrary.entity.Review;
import com.libraryapp.springbootlibrary.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ReviewService {
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail,
                           ReviewRequest reviewRequest)
        throws Exception{
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
        if(validateReview!=null){
            throw new Exception("Review already created");
        }

        Review review =  new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public Boolean userReviewListed(String userEmail,
                                    Long bookId){
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        if(validateReview!=null) return true;
        else return false;
    }

    public List<Long> getUserReviews(String userEmail){
        List<Review> userReviews = reviewRepository.findByUserEmail(userEmail);
        List<Long> userReviewBookIds = new ArrayList<>();
        for(Review review:userReviews){
            userReviewBookIds.add(review.getBookId());
        }
        return userReviewBookIds;
    }

}
