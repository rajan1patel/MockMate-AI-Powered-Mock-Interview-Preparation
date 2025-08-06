"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Page = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setmockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(1);

  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewID));

        if (!result || result.length === 0) {
          console.warn("No interview found with that ID.");
          return;
        }

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setmockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    };

    if (params?.interviewID) {
      getInterviewDetails();
    }
  }, [params?.interviewID]);

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
      {mockInterviewQuestion ? (
        <QuestionSection activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
          
        />
       
      ) : (
        <p className="text-gray-500">Loading questions...</p>
      )}
       <RecordAnswerSection  mockInterviewQuestion={mockInterviewQuestion}  activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}></RecordAnswerSection>

    </div>
    <div className="flex justify-end gap-6 my-5">
     {activeQuestionIndex>0 &&  <Button  onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Prev Question</Button>}
     
     {activeQuestionIndex !=mockInterviewQuestion?.length-1 && 
     <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>
     }

      {activeQuestionIndex===mockInterviewQuestion?.length-1 &&
      <Link href={'/dashboard/interview/' + interviewData.mockId + '/feedback'}>
      <Button>End Interview</Button>
      </Link>}
    </div>
       
       </div>
  );
};

export default Page;
