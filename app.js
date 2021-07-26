const App = {
  data() {
    return {
      title: "Notes",
      input: {
        value: "",
        placeholder: "Type ur note",
      },
      notes: [
        {text: "task 1", edit: false}, 
        {text: "task 2", edit: false},
        {text: "task 3", edit: false},
      ],
    };
  },
  mounted() {
    this.getNotes();
  },
  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem("notes", JSON.stringify(updatedList));
      },
      deep: true,
    },
  },
  methods: {
    getNotes() {
      const localNotes = localStorage.getItem("notes");
      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },
    onSubmit() {
      const source = this.input.value;
      this.notes.push({text: source, edit: false});

      // reset
      this.input.value = "";
    },
    remove(index) {
      console.log(`note: ${index} has been removed`);
      this.notes.splice(index, 1);
    },
    edit(index) {
      this.notes[index].edit = !this.notes[index].edit;
    },
  },
};

Vue.createApp(App).mount("#app");
