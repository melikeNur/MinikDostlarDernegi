package com.dernek.mindos;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.CommandLineRunner;

import javax.annotation.Resource;

import com.dernek.mindos.services.FileService;

@SpringBootApplication
@RestController
public class MindosApplication implements CommandLineRunner {
    @Resource
    FileService storageService;

	public static void main(String[] args) {
		SpringApplication.run(MindosApplication.class, args);
	}
    
    //@Override
    public void run(String... arg) throws Exception {
      storageService.deleteAll();
      storageService.init();
    }
}

