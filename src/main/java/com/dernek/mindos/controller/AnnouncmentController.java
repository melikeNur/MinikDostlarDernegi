package com.dernek.mindos.controller;

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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


import com.dernek.mindos.model.Announcement;
import com.dernek.mindos.repository.AnnouncementRepository;
import com.dernek.mindos.services.FileService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/")
public class AnnouncmentController {
    @Autowired
    private AnnouncementRepository announcmentRepository;
	private FileService fileService;

	Announcement announcement;
    @GetMapping("announcments")

	public List<Announcement>  getAnnouncements(){
       return announcmentRepository.findAllAnnouncements();
       
	}

    @PostMapping("/announcments")
	public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
		try {
			Announcement _announcement = announcmentRepository
					.save(new Announcement(announcement.getTopic(), announcement.getValidityDate(), announcement.getPic()));
			return new ResponseEntity<>(_announcement, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@PutMapping("/announcments/{id}")
	public ResponseEntity<Announcement> updateAnnouncement(@PathVariable("id") long id, @RequestBody Announcement announcement) {
		List<Announcement> announcementData = announcmentRepository.findAnnouncementById(id);

		if (announcementData.size() > 0) {
			Announcement _announcement = (Announcement) announcementData.get(0);
			_announcement.setTopic(announcement.getTopic());
			_announcement.setValidityDate(announcement.getValidityDate());
			_announcement.setPic(announcement.getPic());
			return new ResponseEntity<>(announcmentRepository.save(_announcement), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/announcments/{id}")
	public ResponseEntity<HttpStatus> deleteAnnouncement(@PathVariable("id") long id) {
		try {
			announcmentRepository.deleteAnnouncementById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			System.out.println("erroooş" + e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/announcements")
	public ResponseEntity<HttpStatus> deleteAllAnnoucements() {
		try {
			announcmentRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
}

