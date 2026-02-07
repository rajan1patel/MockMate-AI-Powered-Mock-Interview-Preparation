import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

const QuestionSection = ({ mockInterviewQuestion ,activeQuestionIndex}) => {

  const textToSpeech = (question) => {
    if('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question.question);
      window.speechSynthesis.speak(utterance);
    }
    else{
      alert('Text to speech is not supported in this browser.');
    }
  }
  return  mockInterviewQuestion && Array.isArray(mockInterviewQuestion) && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <>
            <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index && 'bg-blue-500 text-white'}`}
            >
              Question #{index + 1}
            </h2>

           
            </>
            
          ))}
          
      </div>
       <h2 className='my-5 text-sm md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
       <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex])}></Volume2>
       <div className='border rounded-lg p-5 bg-blue-100'>
        <h2 className='flex gap-2 items-center text-blue-700 text-primary'>
          <Lightbulb/>
          <strong>Note:</strong>
        </h2>
        <h2>{'Click on record Answer when you want to answer to question.At the end of interview we will give you the feedback along with correct answer for each question and your answer to compare'}</h2>
       </div>
    </div>
  );
};

export default QuestionSection;
