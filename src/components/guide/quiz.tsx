"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveQuizResult, getQuizResult } from "@/lib/progress-storage";
import type { QuizQuestion as QuizQuestionType } from "@/types/guide";
import { cn } from "@/lib/utils";

interface QuizProps {
  questions: QuizQuestionType[];
  stageSlug: string;
}

export function Quiz({ questions, stageSlug }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    return getQuizResult(stageSlug)?.answers ?? {};
  });
  const [submitted, setSubmitted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return getQuizResult(stageSlug) != null;
  });
  const [score, setScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return getQuizResult(stageSlug)?.score ?? 0;
  });

  const handleAnswer = (questionId: string, optionId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      const selectedId = answers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect);
      if (correctOption && selectedId === correctOption.id) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    saveQuizResult(stageSlug, correct, questions.length, answers);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const allAnswered = questions.every((q) => answers[q.id]);

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 my-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">🧠 Quiz</h3>
        {submitted && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">
              {score}/{questions.length} đúng
            </span>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Làm lại
            </Button>
          </div>
        )}
      </div>

      {submitted && (
        <div className={cn(
          "mb-6 p-4 rounded-xl text-sm font-medium",
          score === questions.length
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
            : score >= questions.length * 0.6
            ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
            : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
        )}>
          {score === questions.length
            ? "🎉 Xuất sắc! Bạn đã trả lời đúng tất cả câu hỏi!"
            : score >= questions.length * 0.6
            ? `👍 Tốt! Bạn trả lời đúng ${score}/${questions.length} câu. Hãy ôn lại các câu sai.`
            : `📚 Bạn cần ôn lại nhiều hơn. Đọc lại nội dung và thử lại nhé!`}
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, qIndex) => {
          const selectedId = answers[q.id];
          const correctOption = q.options.find((o) => o.isCorrect);

          return (
            <div key={q.id}>
              <p className="font-semibold mb-3 text-sm">
                <span className="text-[hsl(var(--muted-foreground))] mr-2">Câu {qIndex + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option) => {
                  const isSelected = selectedId === option.id;
                  const isCorrect = option.isCorrect;
                  let optionClass = "border-[hsl(var(--border))] bg-[hsl(var(--background))]";

                  if (submitted) {
                    if (isCorrect) {
                      optionClass = "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30";
                    } else if (isSelected && !isCorrect) {
                      optionClass = "border-red-400 bg-red-50 dark:bg-red-950/30";
                    }
                  } else if (isSelected) {
                    optionClass = "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5";
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(q.id, option.id)}
                      disabled={submitted}
                      className={cn(
                        "w-full text-left flex items-center gap-3 p-3 rounded-xl border-2 text-sm transition-colors",
                        optionClass,
                        !submitted && "hover:border-[hsl(var(--primary))]/50 cursor-pointer",
                        submitted && "cursor-default"
                      )}
                    >
                      <span className={cn(
                        "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold",
                        isSelected && !submitted && "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white",
                        !isSelected && !submitted && "border-[hsl(var(--border))]"
                      )}>
                        {submitted && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                        {submitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500" />}
                      </span>
                      {option.text}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-3 p-3 rounded-lg bg-[hsl(var(--muted))]/50 text-xs text-[hsl(var(--muted-foreground))]">
                  <span className="font-semibold">Giải thích:</span> {q.explanation}
                  {correctOption && (
                    <span className="block mt-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Đáp án đúng: {correctOption.text}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-6 pt-6 border-t border-[hsl(var(--border))]">
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="w-full"
          >
            Nộp bài ({Object.keys(answers).length}/{questions.length} câu đã chọn)
          </Button>
        </div>
      )}
    </div>
  );
}
