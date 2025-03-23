@Entity
@Table(name = "List")
public class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int listID;

    private String name;

    @ManyToOne
    @JoinColumn(name = "projectID", nullable = false)
    private Project project;

    public TaskList() {
    }

    public TaskList(String name, Project project) {
        this.name = name;
        this.project = project;
    }

    public int getListID() {
        return listID;
    }

    public void setListID(int listID) {
        this.listID = listID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
