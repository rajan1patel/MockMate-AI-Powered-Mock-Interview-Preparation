// "use client";

// import Webcam from "react-webcam"; // Correct component

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Mic, WebcamIcon } from "lucide-react";
// import useSpeechToText from "react-hook-speech-to-text";
// import { toast } from "sonner";
// import { chatSession, getChatSession } from "@/utils/GeminiAIModal";
// import { UserAnswer } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";

// const RecordAnswerSection = ({
//   mockInterviewQuestion,
//   activeQuestionIndex,
//   interviewData,
// }) => {
// const [userAnswer, setUserAnswer] = useState("");
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);

//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect(() => {
//     results.forEach((result) => {
//       setUserAnswer((prevAns) => prevAns + result?.transcript);
//     });
    
//   }, [results]);

//   useEffect(() => {
//     if (!isRecording && userAnswer.length > 10) {
//       UpdateUserAnswer();
//     }
//   }, [isRecording]);


// const StartStopRecording = async () => {
//     if (isRecording) {
//       stopSpeechToText();
//       if (userAnswer?.length < 5) {
//         setLoading(false);
//         toast.error("Please speak for at least 5 seconds");
//         return;
//       }
//     } else {
//       startSpeechToText();
//     }
//   };

//   const UpdateUserAnswer = async () => {
//     console.log(userAnswer);
//     setLoading(true);
//     const feedbackPrompt = `
//         Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
//         User Answer: ${userAnswer}
//         Based on the question and answer, provide a rating and a short feedback (3-5 lines) in JSON format:
//         {
//           "rating": "...",
//           "feedback": "..."
//         }`;
//     try {
//       const chat = await getChatSession();
//       const result = await chat.sendMessage(feedbackPrompt);
//       const text = await result.response.text();

//       // parsing...
//     } catch (error) {
//       if (error.message.includes("503")) {
//         toast.error("Gemini is overloaded. Try again in a few seconds.");
//       } else {
//         toast.error("Failed to fetch feedback from Gemini.");
//       }
//       console.error(error);
//       return;
//     }

//     const resp = await db.insert(UserAnswer).values({
//       mockIdRef: interviewData?.mockId,
//       question: mockInterviewQuestion[activeQuestionIndex]?.question,
//       userAns: userAnswer,
//       correctAns: JSON.parse(jsonFeedBackResp)?.feedback,
//       feedback: JSON.parse(jsonFeedBackResp)?.feedback,
//       rating: JSON.parse(jsonFeedBackResp)?.rating,
//       userEmail: user.priamaryEmailAddress?.emailAddress,
//       createdAt: moment().format("YYYY-MM-DD"),
//     });
//     if (resp) {
//       toast.success("Answer saved successfully");
//       setUserAnswer("");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-10 gap-4 p-4 border justify-center items-center rounded-lg">
//         <Image
//           src={"C:UsersHPDesktopAi Powered interviewmy-apppublic\next.svg"}
//           width={200}
//           height={200}
//           className="absolute"
//         ></Image>

//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: "100%",
//             zIndex: 10,
//             borderRadius: "8px",
//             border: "2px solid #ccc",
//           }}
//         ></Webcam>
//       </div>
//       <Button
//         disabled={loading}
//         className="my-5"
//         onClick={StartStopRecording}
//         variant="outline"
//       >
//         {isRecording ? (
//           <h2 className="text-red-500 flex gap-2">
//             <Mic></Mic>'Stop Recording'
//           </h2>
//         ) : (
//           "Record Answer"
//         )}
//       </Button>
//     </div>
//   );
// };

// export default RecordAnswerSection;



"use client";

import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession, getChatSession } from "@/utils/GeminiAIModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db"; // Make sure this path is correct

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {

  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

//   useEffect(() => {
//     results.forEach((result) => {
//       setUserAnswer((prevAns) => prevAns + result?.transcript);
//     });
    
//   }, [results]);

useEffect(() => {
  if (results && results.length > 0) {
    const newTranscript = results.map((r) => r.transcript).join(" ");
    setUserAnswer(newTranscript); // Replace instead of append
  }
}, [results]);


  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    //   if (userAnswer?.length < 5) {
    //     setLoading(false);
    //     toast.error("Please speak for at least 5 seconds");
    //     return;
    //   }
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const prompt = `
      Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
      User Answer: ${userAnswer}
      Based on the question and answer, provide a rating and a short feedback (3-5 lines) in JSON format:
      {
        "rating": "...",
        "feedback": "..."
      }`;

    try {
      const chat = await getChatSession();
      const result = await chat.sendMessage(prompt);
      const text = await result.response.text().replace('```json', '').replace('```', '');;
 
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        toast.error("Invalid feedback format from Gemini.");
        console.error("JSON Parse Error:", err, "\nRaw Response:", text);
        return;
      }
      console.log("Parsed Feedback:", parsed);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        userAns: userAnswer,
        correctAns:  mockInterviewQuestion[activeQuestionIndex]?.answer,
        feedback: parsed.feedback,
        rating: parsed.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress || "unknown",
        createdAt: moment().format("YYYY-MM-DD"),
      });

      if (resp) {
        toast.success("Answer saved successfully");
        setUserAnswer("");
        setResults([]); // Clear results after saving
      }
    } catch (error) {
      if (error.message?.includes("503")) {
        toast.error("Gemini is overloaded. Try again later.");
      } else {
        toast.error("Failed to get feedback.");
        console.error("Gemini API Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-10 gap-4 p-4 border justify-center items-center rounded-lg">
        <Image
          src="/next.svg" // Use relative public path
          alt="Next Logo"
          width={200}
          height={200}
        />
        <Webcam
          mirrored
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
            borderRadius: "8px",
            border: "2px solid #ccc",
          }}
        />
      </div>

      <Button
        disabled={loading}
        className="my-5"
        onClick={StartStopRecording}
        variant="outline"
      >
        {isRecording ? (
          <span className="text-red-500 flex gap-2 items-center">
            <Mic /> Stop Recording
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;

