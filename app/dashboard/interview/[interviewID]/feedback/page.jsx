"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const page = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const router=useRouter();
  const GetFeedbak = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewID))
      .orderBy(desc(UserAnswer.createdAt));
    console.log(result);
    setFeedbackList(result);
  };
  useEffect(() => {
    GetFeedbak();
  }, [params.interviewID]);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-300">Congratulations</h2>
      <h2>Here is your interview Feedback</h2>

      <h2 className="text-primary text-lg my-3">Your interview rating :7/10</h2>
      <h2 className="text-sm text-gray-500">
        Find interview question with correcet answer and also the feedback to
        improve more{" "}
      </h2>
      {feedbackList &&
        feedbackList.map((item, index) => {
          return (
            <Collapsible key={index} className="mt-10">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7">
                {item.question}<ChevronsUpDown className="h-5 w-5"></ChevronsUpDown>
              </CollapsibleTrigger >
              <CollapsibleContent className="">
            <div>
                <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating:</strong>{item.rating}</h2>
                <h2 className="p-2 border rounded-lg bg-red-50"><strong>Your Answer: </strong>{item.userAns}</h2>
                 <h2 className="p-2 border rounded-lg bg-green-50"><strong>Correct Answer: </strong>{item.correctAns}</h2>
                 <h2 className="p-2 border rounded-lg bg-blue-50 text-primary"><strong>Feedback: </strong>{item.feedback}</h2>
            </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}

        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
};

export default page;
