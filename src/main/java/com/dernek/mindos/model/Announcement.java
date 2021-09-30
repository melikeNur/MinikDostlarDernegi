package com.dernek.mindos.model;


import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;



@Entity
@Table(name = "entities")

public class Announcement extends PostEntity {
    public Announcement() {
        super(0);
    }
    public Announcement(String topic, Date validityDate, String pic) {
        super(0, topic, validityDate);
        this.topic = topic;
        this.validityDate = validityDate;
        this.pic = pic;
    }
    
    @Column(name="pic")
    private String pic;
    public String getPic() {
        return pic;
    }
    public void setPic(String pic) {
        this.pic = pic;
    }
}
