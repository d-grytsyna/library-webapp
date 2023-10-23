package com.libraryapp.springbootlibrary.controller;


import com.libraryapp.springbootlibrary.requestmodels.ReviewRequest;
import com.libraryapp.springbootlibrary.service.ReviewService;
import com.libraryapp.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception{
        String userEmail = ExtractJWT.payloadJWTWExtraction(token, "\"sub\"");
        if(userEmail==null){
            throw new Exception("User email is missing");
        }
        reviewService.postReview(userEmail, reviewRequest);

    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token,
                                    @RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJWT.payloadJWTWExtraction(token, "\"sub\"");
        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        return reviewService.userReviewListed(userEmail, bookId);
    }

    @GetMapping("/secure/reviewed-books")
    public List<Long> reviewedBooks(@RequestHeader(value = "Authorization") String token) throws Exception{
        String userEmail = ExtractJWT.payloadJWTWExtraction(token, "\"sub\"");
        return reviewService.getUserReviews(userEmail);
    }

}
