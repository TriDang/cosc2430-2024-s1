const students = [
  {id: 1, name: 'Alice', grade: 80},
  {id: 2, name: 'Bob', grade: 67},
  {id: 3, name: 'Carol', grade: 78},
  {id: 4, name: 'David', grade: 83},
];

// forEach
// use a named callback function
let display_student = (std) => {
  console.log("ID", std.id);
  console.log("Name", std.name);
  console.log("Grade", std.grade);
}
students.forEach(display_student);

// map
let students_with_hd = students.map((std) => {
  return {
    id: std.id,
    name: std.name,
    grade: std.grade,
    HD: (std.grade >= 80)? true: false
  }
});
console.log("Students with HD status", students_with_hd);

// filter
console.log("Students whose grades are from 70-80", students.filter((std) => std.grade >= 70 && std.grade <= 80));

// reduce
let total_grade = students.reduce((acc, ele) => {
  return {grade: acc.grade + ele.grade}
});
console.log("Average", total_grade.grade / students.length);
