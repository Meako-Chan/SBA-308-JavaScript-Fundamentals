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
//when to use break or continue? Possibly on assignment inclusion based on date?


//Main Function
function getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions){
    if(!validateAssignmentGroup(CourseInfo,AssignmentGroup)){
        throw new Error('Assignment Group is not for valid course ID!');
    }
    if(!validateAssignmentIDs(LearnerSubmissions, AssignmentGroup)){
        throw new Error('Invalid Assignment ID in learner submissions!');
    }
    if(!validatePointsPossible(AssignmentGroup)){
        throw new Error('Invalid points possible in assignments array in Assignment Group!');
    }
    
    
    //Obtain all learner IDs then use a set to find all unique ones
    const learnerIds = LearnerSubmissions.map(submission => submission.learner_id);
    const uniqueIds = [... new Set(learnerIds)];
    let learnerData = [];
    //Get each Learner's data and add object to learner data
    for(id in uniqueIds){
      let currentLearner = getLearnerSubmissions(uniqueIds[id], LearnerSubmissions, AssignmentGroup);
      let Learner = calculateGrades(currentLearner, AssignmentGroup);
      learnerData.push(Learner);
    }
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
      if(object === null){
        break;
      }
      let due_date = (AssignmentGroup.assignments.find(x => x.id === object.assignment_id).due_at);
      if(due_date > currentDate) {
        filtered.splice(filtered.indexOf(object));
      }
    }
    return filtered;
}

//Takes all assignment points from a student and calculates
// their weighted average.
//Assumes LearnerSubmissions is for only one ID.
//Assumes Submissions are for each unique assignment
function calculateGrades(LearnerSubmissions, AssignmentGroup){
    let learner_id = LearnerSubmissions[0].learner_id;
    let total_points = 0;
    let total_possible_points = 0;
    let counter = 0;
    const assignment_grades = new Set();
    for(const object of LearnerSubmissions){
        let submission_score = object.submission.score
        let points_possible = AssignmentGroup.assignments.find(x => x.id === object.assignment_id).points_possible;
        let due_date = (AssignmentGroup.assignments.find(x => x.id === object.assignment_id).due_at);
        if(object.submission.submitted_at  > due_date){
          submission_score = submission_score - (0.1 * points_possible);
        }
        let grade = Number((submission_score / points_possible).toFixed(2));
        assignment_grades.add([object.assignment_id,grade]);
        // learnerObject[object.assignment_id] = grade;
        total_points += submission_score;
        total_possible_points += points_possible;
        counter++;
    }
    let weightedAverage = (total_points/total_possible_points);
    let learnerObject = {};
    learnerObject.id = learner_id;
    learnerObject.avg = weightedAverage;
    for(key of assignment_grades){
      learnerObject[key[0]] = key[1];
    }
    return learnerObject;
    
}

function validatePointsPossible(AssignmentGroup){
  for(let i = 0; i <AssignmentGroup.assignments.length; i++){
    if(AssignmentGroup.assignments[i].points_possible < 1){
      return false;
    }
  }
  return true;
}

//Function used to ensure all assignment submissions have valid IDs and
// points_possible is greater than zero.
function validateAssignmentIDs(LearnerSubmissions, AssignmentGroup){
  const assignmentIDs = AssignmentGroup.assignments.map(assignment => assignment.id);
  const learnerIDs = LearnerSubmissions.map(submission => submission.assignment_id);
  const uniqueIDs1 = [... new Set(assignmentIDs)]
  const uniqueIDs2 = [... new Set(learnerIDs)];

  let checker = (arr, target) => target.every(v => arr.includes(v));
  return checker(uniqueIDs1,uniqueIDs2);
  
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

//If there are multiple submissions,checks for the most recent submission.
//Unfinished function, was planning to filter old submissions and only include the latest submission.
// function checkSubmission(LearnerSubmissions){
  
// }

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

console.log(result);

