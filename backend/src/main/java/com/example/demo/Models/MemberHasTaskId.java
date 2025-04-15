package com.example.demo.Models;

import java.io.Serializable;
import java.util.Objects;

public class MemberHasTaskId implements Serializable {
    private int member;
    private int task;

    // Constructors, equals, and hashCode
    public MemberHasTaskId() {}

    public MemberHasTaskId(int member, int task) {
        this.member = member;
        this.task = task;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MemberHasTaskId)) return false;
        MemberHasTaskId that = (MemberHasTaskId) o;
        return Objects.equals(member, that.member) &&
               Objects.equals(task, that.task);
    }

    @Override
    public int hashCode() {
        return Objects.hash(member, task);
    }

    //getter and setter methods
    public int getMember() {
        return member;
    }

    public void setMember(int member) {
        this.member = member;
    }

    public int getTask() {
        return task;
    }  

    public void setTask(int task) {
        this.task = task;
    } 
}