//Outlining the Problem
//1. Ensure all assignments in assignment group match course ID
//2. For each learner, take learner id, validate assignment IDs and compile a group of submissions for the learner
//3. Use assignment group and learner submissions to calculate grades and average
//4. Return all Learner data

//Edge Cases: AssignmentGroup does not belong to course course_id
//Multiple Courses, assignments with matching id
function getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions){

}

//With a learner id forms an array with all assignments
//that count towards their average.
function getLearnerSubmissions(id, LearnerSubmissions){

}

//Takes all assignment points from a student and calculates
// their weighted average 
function getWeightedAverage(id, LearnerSubmissions, AssignmentGroup){

}

//If there are multiple submissions,checks for the most recent submission
function checkSubmission(LearnerSubmissions){

}

//Function used to ensure all assignment submissions have valid IDs
function validateAssignments(LearnerSubmissions, AssignmentGroup){

}

//Function to validate Assignment group is for valid course
function validateAssignmentGroup(CourseInfo, AssignmentGroup){

}

  // The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];