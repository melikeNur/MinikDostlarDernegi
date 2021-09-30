package com.dernek.mindos.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class PostEntity {
    PostEntity() {
        this.setType(0);
    }

    PostEntity(int type) {
        this.setType(type);
    }

    PostEntity(int type, String topic, Date validityDate) {
        this.topic = topic;
        this.validityDate = validityDate;
        this.setType(type);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    protected long id;
    public long getId() {
        return id;
    }

    @Column(name = "topic")
    protected String topic;
    public String getTopic() {
        return topic;
    }
    public void setTopic(String topic) {
        this.topic = topic;
    }

    @Column(name = "validityDate")
    protected Date validityDate;
    public Date getValidityDate() {
        return validityDate;
    }
    public void setValidityDate(Date validityDate) {
        this.validityDate = validityDate;
    }

    @Column(name = "type")
    protected int type;
    int getType() {
        return type;
    }
    void setType(int type) {
        this.type = type;
    }
}
