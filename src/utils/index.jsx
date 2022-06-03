import moment from "moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";

export const IDEA = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];

export const validationEmail = (email) => {
  const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return EMAIL_PATTERN.test(email);
};

export const displayErrorMessage = (errorMessage) => {
  return <div className="text-danger-color text-center mt-2">{errorMessage}</div>;
};

export const getTimeStamp = (time) => {
  return +new Date(time);
};

export const convertMinuteToMilliseconds = (minute) => {
  return minute * 60000;
};
export const currentTime = +new Date();

export const convertTimeStampToDateTime = (timeStamp) => {
  const date = new Date(timeStamp);
  return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
};

export const convertMillisecondToMinute = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 && "0") + seconds;
};

export const convertHourToTimeStamp = (date, hour) => {
  const hourInDate = moment(`${date} ${hour}`).format();
  return +new Date(hourInDate);
};

export const checkObject = (ob) => {
  if (typeof ob === "object" && Object.keys(ob).length !== 0) {
    return ob;
  }
  return false;
};

export const url = "https://quiz-app-wind-remake.herokuapp.com";

export const LOCAL_ACCESS_TOKEN = "accessToken";

export const ERROR_SIGN_IN = "Account or password incorrect";

// status session
const WAITING_STATUS = "Waiting";
const HAPPENING_STATUS = "Happening";
const EXPIRES_STATUS = "Expires";

const setClassStatus = (text) => {
  return text === WAITING_STATUS
    ? "text-main-color"
    : text === HAPPENING_STATUS
      ? "text-[blue]"
      : "text-danger-color";
};
// table header session

export const listTeacher = [
  "Thanh Phong",
  "Hong Quan",
];

export const COLUMNS_SESSION_TABLE = [
  {
    title: "Teacher",
    dataIndex: "teacher",
    key: "teacher",
    filters: listTeacher.map((teacher) => {
      return { text: teacher, value: teacher };
    }),
    onFilter: (value, record) => record.teacher.indexOf(value) === 0,
    sortDirections: ["descend"],
  },
  {
    title: "Participant",
    dataIndex: "id",
    key: "id",
    render: (id) => <Link key={id} to={`/admin/session/participants/${id}`}>Participant</Link>,
  },
  {
    title: "Quiz Name",
    dataIndex: "category",
    key: "category",
    render: (category, record) => <Link key={record.quizId} to={`/admin/quiz/${record.quizId}`}>{category}</Link>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Start",
    dataIndex: "timeStart",
    key: "timeStart",
  },
  {
    title: "End",
    dataIndex: "timeEnd",
    key: "timeStart",
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
    render: (text) => <div className={`${setClassStatus(text)}`}>{text}</div>,
    filters:
      [
        {
          text: WAITING_STATUS,
          value: WAITING_STATUS,
        },
        {
          text: HAPPENING_STATUS,
          value: HAPPENING_STATUS,
        },
        {
          text: EXPIRES_STATUS,
          value: EXPIRES_STATUS,
        },
      ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    sortDirections: ["descend"],
  },
  {
    title: "Session id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Action",
    dataIndex: "none",
    key: "none",
    render: () => <Link to="/">Take the test.</Link>,
  },
];

export const COLUMNS_PARTICIPANTS_TABLE = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Score",
    dataIndex: "result",
    key: "result",
    sorter: (a, b) => a.result - b.result,
  },
];

export const convertSessionsToView = (sessions) => {
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return [];
  }

  return sessions.map((session, index) => {
    const {
      _id, category, timeStart, timeEnd, date, teacher, quizId,
    } = session;
    const status = timeEnd < currentTime
      ? EXPIRES_STATUS
      : timeStart < currentTime && timeEnd > currentTime
        ? HAPPENING_STATUS
        : WAITING_STATUS;

    return {
      key: index,
      quizId,
      teacher,
      index,
      id: _id,
      category,
      date: moment(date).format("DD-MM-YYYY"),
      timeStart: convertTimeStampToDateTime(timeStart),
      timeEnd: convertTimeStampToDateTime(timeEnd),
      status,
    };
  });
};
export const isBlank = (str) => {
  const regexCheckSpaceString = /^\s*$/;
  const isSpaceString = regexCheckSpaceString.test(str);
  return isSpaceString;
};

export const checkElementEmpty = (arr) => {
  let isEmpty = false;
  if (!Array.isArray(arr)) {
    isEmpty = true;
  } else {
    const listEmptyOfArray = arr.filter((el) => isBlank(el.content));
    isEmpty = listEmptyOfArray.length !== 0;
  }
  return isEmpty;
};

export const formTimeChallenge = [
  {
    value: 30000,
    text: "05:00",
  },
  {
    value: 60000,
    text: "10:00",
  },
  {
    value: 90000,
    text: "15:00",
  },
];

export const checkDuplicateAnswer = (answers) => {
  const listAnswers = answers.map((answer) => answer.content);
  const findDuplicate = (arr) => arr.filter((item, index) => {
    return arr.indexOf(item) !== index;
  });
  // return array element duplicate
  if (findDuplicate(listAnswers).length === 0) {
    return false;
  }
  return true;
};

export const sortByTimeStart = (sessionA, sessionB) => {
  return sessionB.timeStart - sessionA.timeStart;
};

export const convertSession = (sessions) => {
  if (!Array.isArray(sessions) || sessions.length === 0) return;
  const sessionsHappening = sessions
    .filter((session) => session.timeStart < currentTime && session.timeEnd > currentTime);
  const sessionsFill = sessions.filter((session) => {
    return session.timeEnd < currentTime || session.timeStart > currentTime;
  }).sort(sortByTimeStart);

  return [...sessionsHappening, ...sessionsFill];
};

export const createNewQuestion = (newId) => {
  return {
    id: newId,
    content: "",
    answers: [
      {
        id: nanoid(),
        content: "",
      },
      {
        id: nanoid(),
        content: "",
      },
    ],
    correct_answer: null,
    isNewQuestion: true,
    editing: true,
    isQuestionEditing: true,
  };
};

export const triggerAlertConfirm = (message) => {
  return Swal.fire(({
    title: message,
    showDenyButton: true,
    confirmButtonText: "YES",
    denyButtonText: "NO",
  }));
};

export const triggerAlertOnlyMessage = (message) => {
  return Swal.fire(message);
};

export const isExistQuestionEditing = (questions) => {
  if (!Array.isArray(questions)) return false;
  return questions.filter((question) => question.isQuestionEditing).length !== 0;
};



// export const covertDataTable
