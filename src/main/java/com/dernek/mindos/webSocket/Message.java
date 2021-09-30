package com.dernek.mindos.webSocket;

public class Message {
    private String data;
    private String message;

    public Message() {
    }

    public Message(String data, String message) {
        super();
        this.data = data;
        this.message = message;
    }

    public String getData() {
        return data;
    }

    public void setUserName(String userName) {
        this.data = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "data='" + data + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
