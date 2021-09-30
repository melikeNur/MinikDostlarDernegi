package com.dernek.mindos.controller;

import java.util.*;
//import java.util.List;

import com.dernek.mindos.model.News;
import com.dernek.mindos.repository.AnnouncementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/")
public class NewsController {

    @Autowired
    AnnouncementRepository newsRepository;
    @GetMapping("news")
    public List<News> getNews(){
        return newsRepository.findAllNews();
    }

    @PostMapping("/news")
	public ResponseEntity<News> createNews(@RequestBody News news) {
		try {
			News _news = newsRepository
					.save(new News(news.getTopic(), news.getValidityDate(), news.getContent(),news.getLink()));
			return new ResponseEntity<>(_news, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PutMapping("/news/{id}")
	public ResponseEntity<News> updateAnnouncement(@PathVariable("id") long id, @RequestBody News news) {
		List<News> newsData = newsRepository.findNewsById(id);

		if (newsData.size() > 0) {
			News _news = newsData.get(0);
			_news.setTopic(news.getTopic());
			_news.setValidityDate(news.getValidityDate());
			_news.setContent(news.getContent());
            _news.setLink(news.getLink());
			return new ResponseEntity<>(newsRepository.save(_news), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/news/{id}")
	public ResponseEntity<HttpStatus> deleteNews(@PathVariable("id") long id) {
		try {
			newsRepository.deleteNewsById(id);
			System.out.println("helloş=" +id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			System.out.println("melloş=" + e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/news")
	public ResponseEntity<HttpStatus> deleteAllAnnoucements() {
		try {
			newsRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}

