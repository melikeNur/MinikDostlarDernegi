package com.dernek.mindos.model;


import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "entities")
@NamedQuery(name = "News.findAllNews",
  query = "select u from News u where u.content = ?1")
public class News extends PostEntity {
    public News() {
        super(1);
    }

    public News(String topic, Date validityDate, String content,String link) {
        super(1, topic, validityDate);
        this.content=content;
        this.link =link;
    }

    @Column(name="content")
    protected String content;
    
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    @Column(name="link")
    protected String link;

    public String getLink(){
        return link;
    }
    public void setLink(String link){
        this.link=link;
    }
}

