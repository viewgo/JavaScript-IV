// CODE here for your Lambda Classes
class Person {
    constructor(c) {
        this.name = c.name;
        this.age = c.age;
        this.location = c.location;
    }

    speak() {
        console.log(`Hello! My name is ${this.name}, and I'm ${this.age} years old from ${this.location}.`);
    }
}

class Instructor extends Person {
    constructor(c) {
        super(c);
        this.specialty = c.specialty;
        this.favLanguage = c.favLanguage;
        this.catchPhrase = c.catchPhrase;
    }

    demo(subject) {
        console.log(`Today we are learning about ${subject}.`);
    }

    grade(student, subject) {
        console.log(`${student.name} receives a perfect score on ${subject}.`);
    }

    changeGrade(student) {
        student.grade += Math.floor(Math.random() * (10 - -10)) + -10;
        console.log(`${this.name} graded ${student.name}'s assigments. Their grade is now a ${student.grade}%.`);
        student.graduate();
    }
}

class Student extends Person {
    constructor(c) {
        super(c);
        this.previousBackground = c.previousBackground;
        this.className = c.className;
        this.favSubjects = c.favSubjects;
        this.grade = c.grade;
        this.teacher = c.teacher;
    }

    listsSubjects() {
        this.favSubjects.array.forEach(element => {
            console.log(element);
        });
    }

    PRAssignment(subject) {
        console.log(`${this.name} has submitted a PR for ${subject}.`);
    }

    sprintChallenge(subject) {
        console.log(`${this.name} has begun sprint challenge on ${subject}.`);
    }

    graduate() {
        if (this.grade > 70) {
            console.log(`${this.name} is ready to graduate with a grade of ${this.grade}%!`);
        } else {
            console.log(
                `${this.name} isn't ready to graduate with a grade of ${this.grade}%. Grading their assignments...`
            );
            this.teacher.changeGrade(this);
        }
    }
}

class ProjectManager extends Instructor {
    constructor(c) {
        super(c);
        this.gradClassName = c.gradClassName;
        this.favInstructor = c.favInstructor;
    }

    standUp(channel) {
        console.log(`${this.name} announces to ${channel}, @channel standy times!`);
    }

    debugsCode(student, subject) {
        console.log(`${this.name} debugs ${student.name}'s code on ${subject}`);
    }
}

const fred = new Instructor({
    name: "Fred",
    location: "Bedrock",
    age: 37,
    favLanguage: "JavaScript",
    specialty: "Front-end",
    catchPhrase: `Don't forget the homies`
});

const john = new Student({
    name: "John",
    location: "New York",
    age: 21,
    previousBackground: "Hitman",
    className: "WEB24",
    favSubjects: ["HTML", "CSS", "JavaScript"],
    grade: 70,
    teacher: fred
});

john.graduate(); //Should loop until John graduates.
