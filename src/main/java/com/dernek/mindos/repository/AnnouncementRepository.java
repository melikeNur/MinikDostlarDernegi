package com.dernek.mindos.repository;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dernek.mindos.model.Announcement;
import com.dernek.mindos.model.News;
import com.dernek.mindos.model.PostEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;


@Repository
//@SuppressWarnings("deprecation")
public interface AnnouncementRepository extends JpaRepository<PostEntity, Long> {

    @Query("select u from Announcement u where u.type = 0")
    List<Announcement> findAllAnnouncements ();

    @Query("select u from News u where u.type = 1")
    List<News> findAllNews();

    @Query("select u from News u where u.id = ?1")
    List<News> findNewsById(long id);
    
    @Query("select u from Announcement u where u.id = ?1")
    List<Announcement> findAnnouncementById(long id);

    //@Query("delete from Announcement i where i.id = ?1")
    //Long deleteAnnouncementById(long id);
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Announcement i WHERE i.id = :id") 
      void deleteAnnouncementById(@Param("id") long id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM News i WHERE i.id = :id") 
      void deleteNewsById(@Param("id") long id);   
}