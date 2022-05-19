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
  return <div className="text-[red] text-center mt-2">{errorMessage}</div>;
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
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const url = "https://quiz-app-wind-remake.herokuapp.com";

export const LOCAL_ACCESS_TOKEN = "accessToken";

// status session
const WAITING_STATUS = "Waiting";
const HAPPENING_STATUS = "Happening";
const EXPIRES_STATUS = "Expires";

const setClassStatus = (text) => {
  return text === WAITING_STATUS
    ? "text-[green]"
    : text === HAPPENING_STATUS
      ? "text-[blue]"
      : "text-[red]";
};
// table header session
export const COLUMNS_SESSION_TABLE = [
  {
    title: "No.",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "SESSION ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <div className={`${setClassStatus(text)}`}>{text}</div>,
  },
];
export const convertSessionsToView = (sessions) => {
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return [];
  }

  return sessions.map((session, index) => {
    const {
      _id, category, timeStart, timeEnd,
    } = session;
    const status = timeEnd < currentTime
      ? EXPIRES_STATUS
      : timeStart < currentTime && timeEnd > currentTime
        ? HAPPENING_STATUS
        : WAITING_STATUS;

    return {
      key: index,
      index,
      id: _id,
      category,
      status,
    };
  });
};
// export const covertDataTable
