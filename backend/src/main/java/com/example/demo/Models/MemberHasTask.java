package com.example.demo.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "MemberHasTask")
@IdClass(MemberHasTaskId.class)
public class MemberHasTask {
    @Id
    @ManyToOne
    @JoinColumn(name = "memberID")
    private User member;

    @Id
    @ManyToOne
    @JoinColumn(name = "taskID")
    private Task task;

    public MemberHasTask() {}

    public MemberHasTask(User member, Task task) {
        this.member = member;
        this.task = task;
    }

    public User getMember() {
        return member;
    }

    public void setMember(User member) {
        this.member = member;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
