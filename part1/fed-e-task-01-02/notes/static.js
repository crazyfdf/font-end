class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(`name:${this.name}`);
  }
  static create(name) {
    // console.log(this);//[class Person]
    return new Person(name);
  }
}
// const tom = new Person("tom");
// tom.say();
// tom.create("mm"); //tom.create is not a function
const tom = Person.create("tom");
tom.say();
