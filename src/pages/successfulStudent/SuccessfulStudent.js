import React, { useState, useEffect } from 'react';
import './successStudent.css';
import ChoseSubjectMenu from '../../components/choseSubject/ChoseSubjectMenu';
import TaskCardSuccessful from '../../components/taskCard/taskCardSuccessful/TaskCardSuccessful';
import { useParams } from 'react-router-dom';

function SuccessfulStudent() {
  const { subjectName } = useParams();
  const decodedSubjectName = decodeURIComponent(subjectName);
  const [selectedSubject, setSelectedSubject] = useState(decodedSubjectName);

  useEffect(() => {
    setSelectedSubject(decodedSubjectName);
  }, [decodedSubjectName]);

  return (
    <main className="main_successfulStudent">
      <div className="container_successfulStudent">
        <ChoseSubjectMenu setSelectedSubject={setSelectedSubject} />
        {selectedSubject && <TaskCardSuccessful selectedSubject={selectedSubject} />}
      </div>
    </main>
  );
}

export default SuccessfulStudent;



// import React, { useEffect } from 'react';
// import './successStudent.css';
// import ChoseSubjectMenu from '../../components/choseSubject/ChoseSubjectMenu';
// import TaskCardSuccessful from '../../components/taskCard/taskCardSuccessful/TaskCardSuccessful';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

// function SuccessfulStudent() {
//   const { subjectName } = useParams();
//   const navigate = useNavigate();
//   const [cookies] = useCookies(['subjects']);

//   useEffect(() => {
//     if (cookies.subjects && !subjectName) {
//       const firstSubject = cookies.subjects[0];
//       navigate(`/successfulStudent/${encodeURIComponent(firstSubject)}`);
//     }
//   }, [cookies, navigate, subjectName]);

//   return (
//     <main className="main_successfulStudent">
//       <div className="container_successfulStudent">
//       <ChoseSubjectMenu availableSubjects={availableSubjects} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}/>
//         {subjectName && <TaskCardSuccessful />}
//       </div>
//     </main>
//   );
// }

// export default SuccessfulStudent;




// import React, { useState } from 'react';
// import './successStudent.css';
// import ChoseSubjectMenu from '../../components/choseSubject/ChoseSubjectMenu';
// import TaskCardSuccessful from '../../components/taskCard/taskCardSuccessful/TaskCardSuccessful';

// function SuccessfulStudent() {
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   return (
//     <main className="main_successfulStudent">
//       <div className="container_successfulStudent">
//         <ChoseSubjectMenu setSelectedSubject={setSelectedSubject} />
//         {selectedSubject && <TaskCardSuccessful selectedSubject={selectedSubject} />}
//       </div>
//     </main>
//   );
// }

// export default SuccessfulStudent;