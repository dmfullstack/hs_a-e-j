rm solution -rvf
rm submission -rvf

ASSIGNMENT_SOLUTION=../assignments/chicago-crime-data\
	ASSIGNMENT_SOLUTION_REF=master\
	ASSIGNMENT_SUBMISSION=../submissions/chicago-crime-data\
	ASSIGNMENT_SUBMISSION_REF=master\
	MONGO_URL=mongodb://localhost:27017/hobbes\
	./evaluate.sh
