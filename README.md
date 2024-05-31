# SBA 308 JavaScript Fundamentals
This code takes three different arrays of objects, and creates a resultant array of objects formatted by each learner.

The code begins at line 219, which stores the result to be printed after calling the function getLearnerData with the three different arrays of objects.
You can also change the data under line 139, as long as it is in the same format.

After calling the function getLearnerData, it does the following steps:
1. Performs the three following checks:
   - Validates Assignment Group: checks whether course_id in AssignmentGroup matches with CourseInfo.id.
   - Validates Assignment IDs: finds all unique assignment ids in LearnerSubmissions and AssignmentGroup and ensures all assignment 
     ids in LearnerSubmissions are in Assignment Group.
   - Validates Points Possible for each assignment: Checks whether there is at least 1 point possible for each assignment in   
     AssignmentGroup.
     
2. Checks for all learners:
   -Maps all learner IDs in LearnerSubmissions into learnerIds
   -creates a set and places back into array to get all unique learners.
   
3.Creates a learner object isolating submissions for each learner:
   -entering the for...in loop, for each unique learner ID invokes getLearnerSubmissions to filter out submissions not made by the current learner and assignments that have not passed their due date, then returns the resulting array and stores it into 
currentLearner.

4.Creates learner object to push into result array:
   -invokes calculate_grades which simultaneously calculates all grades and average in a loop and creates the learner object.
   The learner object contains the following:
   id: ID of the learner (obtained by taking a learner_id from the learner's submissions)
   average: Weighted average of the learner (obtained by using three counters, total_points, total_possible_points, and counter).
   -total_points are the total points the learner obtained through submissions, total_possible_points are all the possible points that could have been obtained for the assignment in AssignmentGroup, and counter keeps track of the number of assignments.
   <assignment_id> number: for each grade, places into a Set named assignment_grades to be inserted into the Learner Object.
5.Returns resultant array learnerData;
-returns the resultant array at the end of the function which is console.logged on line 220.
   
