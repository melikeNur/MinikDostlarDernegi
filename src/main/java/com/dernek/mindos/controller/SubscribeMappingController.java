package com.dernek.mindos.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@Controller
public class SubscribeMappingController {

    private static final Logger logger = LoggerFactory.getLogger(SubscribeMappingController.class);

    @SubscribeMapping("/subscribe")
    public String sendOneTimeMessage() {
        logger.info("Subscription via the application");
        return "server one-time message via the application";
    }
}