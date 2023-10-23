package com.libraryapp.springbootlibrary.controller;

import com.libraryapp.springbootlibrary.entity.Message;
import com.libraryapp.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.libraryapp.springbootlibrary.service.MessagesService;
import com.libraryapp.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {
    private MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest){
        String userEmail = ExtractJWT.payloadJWTWExtraction(token, "\"sub\"");
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token, @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception{
        String userEmail = ExtractJWT.payloadJWTWExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTWExtraction(token, "\"userType\"");
        if(admin==null || !admin.equals("admin")){
            throw new Exception("Administration page only");
        }
        messagesService.putMessage(adminQuestionRequest, userEmail);
    }

}
