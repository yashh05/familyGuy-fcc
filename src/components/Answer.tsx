"use client";
import { useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { FiRepeat } from "react-icons/fi";
import { MdNearbyError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface AnswerProps {
  answers: string[];
  questionId: string;
}

export const Answer: React.FC<AnswerProps> = ({ answers, questionId }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [data, setData] = useState<{
    correct_answer: string;
    random: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let subscribed = true;

    const fetchData = async () => {
      const res = await fetch(`/api/quiz/answer/${questionId}`);
      const data = await res.json();
      setLoading(false);
      if (subscribed) {
        setData(data);
      }
    };
    if (selected) {
      setLoading(true);
      fetchData();
    }

    return () => {
      console.log("cancelled!");
      subscribed = false;
    };
  }, [questionId, selected]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {answers.map((item) => {
          const isLoading = selected === item && loading;
          const isWrong =
            selected === item && data && data?.correct_answer !== selected;
          const isCorrect = data?.correct_answer === item;

          return (
            <li key={item}>
              <button
                disabled={data !== null || loading}
                onClick={() => setSelected(item)}
                className={cn(
                  "p-2 rounded-md  items-center justify-between w-full flex text-sm font-semibold disabled:cursor-not-allowed transition-all",
                  isLoading && "animate-pulse",
                  isWrong ? "bg-red-700" : "bg-slate-800",
                  isCorrect && "outline text-green-500"
                )}
              >
                {item}
                {isCorrect && <FaCheck />}
                {isWrong && <MdNearbyError />}
              </button>
            </li>
          );
        })}
      </ul>
      {data?.random && (
        <Link
          href={`/quiz/${data.random}`}
          className="flex items-center gap-1 text-blue-400"
          rel="noopener noreferrer"
        >
          <FiRepeat className="mt-1" />
          Do it again
        </Link>
      )}
    </>
  );
};
