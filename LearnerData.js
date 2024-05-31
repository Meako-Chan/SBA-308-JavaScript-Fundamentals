//Outlining the Problem
//1. Ensure all assignments in assignment group match course ID
//2. For each learner, take learner id, validate assignment IDs and compile a group of submissions for the learner
//3. Use assignment group and learner submissions to calculate grades and average
//4. Return all Learner data
//Edge Cases: AssignmentGroup does not belong to course course_id
//Multiple Courses, assignments with matching id
//Ask Manara, what if a learnerId has multiple submissions for same assignment
//or if there are multiple courses and the learner is in multiple courses, do we calculate
//their weighted average accordingly?
//when to use break or continue? Possible on assignment inclusion based on date?
//To Do- List:
//Finish weighted average
//Augment getLearnerSubmissions to not include assigments that due date has not passed
//Create learnerObject and add all learners to learnerData to reutrn

//Main Function
function getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions){
    if(!validateAssignmentGroup(CourseInfo,AssignmentGroup)){
        throw new Error('Assignment Group is not for valid course ID!');
    }
    //Obtain all learner IDs then use a set to find all unique ones
    const learnerIds = LearnerSubmissions.map(submission => submission.learner_id);
    const uniqueIds = [... new Set(learnerIds)];
    // console.log(uniqueIds);
    let learnerData = [];
    //Get each Learner's data and add object to learner data
    //STILL NEED TO MAKE SURE DUE DATES ARE CORRECT
    let currentLearner = getLearnerSubmissions(uniqueIds[0], LearnerSubmissions, AssignmentGroup);
    // console.log(currentLearner)
    let weightedAverage = getWeightedAverage(currentLearner, AssignmentGroup);
    let learnerObject = createLearnerObject(currentLearner, AssignmentGroup);
    return learnerData;
    
}   

//With a learner id forms an array with all assignments
//that count towards their average.
function getLearnerSubmissions(id, LearnerSubmissions, AssignmentGroup){
    let date = new Date;
    let day = date.getDate();
    let month = date.getMonth()+1;
    if(month < 10){
      month = '0' + month;
    }
    let year = date = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    let filtered = LearnerSubmissions.filter(submission => submission.learner_id === id);
    
    for(let object of filtered){
      // console.log(currentDate);
      let due_date = (AssignmentGroup.assignments.find(x => x.id === object.assignment_id).due_at);
      if(due_date > currentDate) {
        filtered.splice(filtered.indexOf(object));
      }
    }
    // console.log(filtered);
    return filtered;
}

//Takes all assignment points from a student and calculates
// their weighted average.
//Assumes the learnersubmission is for only one ID.
function getWeightedAverage(LearnerSubmissions, AssignmentGroup){
    let total_points = 0;
    let counter = 0;
    for(const object of LearnerSubmissions){
        total_points += object.submission.score;
        counter++;
    }
}

//Creates learner object to place into learnerData Array.
function createLearnerObject(LearnerSubmissions, AssignmentGroup, Average){

}

//If there are multiple submissions,checks for the most recent submission.
function checkSubmission(LearnerSubmissions){

}

//Function used to ensure all assignment submissions have valid IDs and
// points_possible is greater than zero.
function validateAssignments(LearnerSubmissions, AssignmentGroup){

}

//Function to validate Assignment group is for a valid course.
function validateAssignmentGroup(CourseInfo, AssignmentGroup){
    try{
        const validate = AssignmentGroup.course_id === CourseInfo.id;
        return validate;
    }catch(error){
       throw new Error("Invalid input, there is either no course id in assignment group or course id in CourseInfo.");
    }
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
  


const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
let date = new Date;
let day = date.getDate();
let month = date.getMonth()+1;
if(month < 10){
    month = '0' + month;
}
let year = date = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;
// console.log(currentDate);

//   console.log(result);

// console.log(validateAssignmentGroup(CourseInfo, AssignmentGroup));