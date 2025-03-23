package com.example.demo.Models;

import java.io.Serializable;
import java.util.Objects;

public class TeamHasMemberId implements Serializable {
    private int team;
    private int user;

    public TeamHasMemberId() {}

    public TeamHasMemberId(int team, Long user) {
        this.team = team;
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeamHasMemberId that = (TeamHasMemberId) o;
        return Objects.equals(team, that.team) && Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(team, user);
    }
}

