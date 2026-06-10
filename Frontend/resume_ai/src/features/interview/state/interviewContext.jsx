import { createContext, useState } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reportList, setReportList] = useState([]);

    return (
        <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reportList, setReportList }}>
            {children}
        </InterviewContext.Provider>
    );
};

export default InterviewContext;