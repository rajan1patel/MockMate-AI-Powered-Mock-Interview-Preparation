import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Icon from "react-crud-icons";
// import "react-crud-icons/dist/react-crud-icons.css";

function InterviewItemCard({ interview, onDelete }) {
  const router = useRouter();

  const handleFeedback = () => {
    router.push(`/dashboard/interview/${interview.mockId}/feedback`);
  };
  const handleStartInterview = () => {
    router.push(`/dashboard/interview/${interview.mockId}/start`);
  };
  return (
    <div>
      <div className="border shadow-sm rounded-lg p-3">
        <h2 className="font-bold text-primary">{interview.jobPosition}</h2>
        <h2 className="text-sm text-gray-500">
          {interview.jobExperience} Years of experience
        </h2>
        <h2 className="text-sm text-gray-500">
          Created At:{interview.createdAt}
        </h2>
        <div className="flex justify-between items-center mt-5">
          <Button size="sm" variant="outline" onClick={handleFeedback}>
            {" "}
            FeedBack
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="cursor-default"
            onClick={() => onDelete(interview.mockId)}
          >
            {" "}
            <Icon
              name="delete"
              theme="light"
              size="medium"
              onClick={() => onDelete(interview.mockId)}
            />
          </Button>
          <Button size="sm" onClick={handleStartInterview}>
            {" "}
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewItemCard;
