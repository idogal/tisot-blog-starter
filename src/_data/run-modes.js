class RunMode {
  static Watch = new RunMode("watch");
  static Serve = new RunMode("serve");
  static Build = new RunMode("build");

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `RunMode.${this.name}`;
  }
}

module.exports = {
  RunMode,
};
