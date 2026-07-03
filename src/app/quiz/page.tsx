import { stages } from "@/content/stages";
import Link from "next/link";

export const metadata = {
  title: "Quiz kiểm tra kiến thức | AWS Starter Guide",
};

export default function QuizPage() {
  const totalQuestions = stages.reduce((acc, s) => acc + s.quiz.length, 0);
  const stagesWithQuiz = stages.filter((s) => s.quiz.length > 0);

  return (
    <main className="quiz-page">
      <style>{`
        .quiz-page {
          min-height: 100vh;
          background: #0F172A;
          color: #F8FAFC;
          font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
          padding: 3rem 1.5rem 5rem;
        }

        .quiz-header {
          max-width: 860px;
          margin: 0 auto 2.5rem;
        }

        .quiz-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #38BDF8;
          margin-bottom: 0.75rem;
        }

        .quiz-title {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          line-height: 1.2;
          text-wrap: balance;
          color: #F8FAFC;
          margin: 0 0 1rem;
        }

        .quiz-subtitle {
          font-size: 0.95rem;
          color: #94A3B8;
          line-height: 1.6;
          max-width: 520px;
        }

        .stats-bar {
          display: flex;
          gap: 1px;
          max-width: 860px;
          margin: 0 auto 3rem;
          border-radius: 10px;
          overflow: hidden;
          background: #1E3A5F;
        }

        .stat-block {
          flex: 1;
          background: #162032;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-block:first-child {
          border-radius: 10px 0 0 10px;
        }

        .stat-block:last-child {
          border-radius: 0 10px 10px 0;
        }

        .stat-number {
          font-family: ui-monospace, 'SF Mono', Consolas, monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #38BDF8;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #64748B;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .section-label {
          max-width: 860px;
          margin: 0 auto 1rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
        }

        .cards-grid {
          max-width: 860px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 0.875rem;
        }

        .stage-card {
          background: #162032;
          border: 1px solid #1E3A5F;
          border-radius: 10px;
          padding: 1.25rem 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          text-decoration: none;
          color: inherit;
          transition: border-color 150ms ease, background 150ms ease;
          outline: none;
        }

        .stage-card:hover,
        .stage-card:focus-visible {
          border-color: #38BDF8;
          background: #1A2B40;
        }

        .stage-card:focus-visible {
          box-shadow: 0 0 0 2px #38BDF8;
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .card-stage-num {
          font-family: ui-monospace, 'SF Mono', Consolas, monospace;
          font-size: 0.7rem;
          font-weight: 600;
          color: #38BDF8;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.5rem;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 4px;
          white-space: nowrap;
        }

        .card-q-count {
          font-family: ui-monospace, 'SF Mono', Consolas, monospace;
          font-size: 0.75rem;
          color: #64748B;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }

        .card-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #CBD5E1;
          line-height: 1.4;
          flex: 1;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #1E3A5F;
          padding-top: 0.75rem;
        }

        .card-action {
          font-size: 0.78rem;
          font-weight: 500;
          color: #38BDF8;
          letter-spacing: 0.02em;
        }

        .card-arrow {
          color: #38BDF8;
          opacity: 0.6;
          transition: opacity 150ms ease, transform 150ms ease;
        }

        .stage-card:hover .card-arrow,
        .stage-card:focus-visible .card-arrow {
          opacity: 1;
          transform: translateX(3px);
        }

        @media (max-width: 540px) {
          .quiz-page {
            padding: 2rem 1rem 4rem;
          }
          .stats-bar {
            flex-direction: column;
            gap: 1px;
          }
          .stat-block:first-child {
            border-radius: 10px 10px 0 0;
          }
          .stat-block:last-child {
            border-radius: 0 0 10px 10px;
          }
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stage-card,
          .card-arrow {
            transition: none;
          }
        }
      `}</style>

      <div className="quiz-header">
        <p className="quiz-eyebrow">AWS Starter Guide</p>
        <h1 className="quiz-title">Quiz kiểm tra kiến thức</h1>
        <p className="quiz-subtitle">
          Ôn luyện từng giai đoạn học AWS. Chọn một stage bên dưới để bắt đầu
          làm quiz ngay tại trang đó.
        </p>
      </div>

      <div className="stats-bar">
        <div className="stat-block">
          <span className="stat-number">{totalQuestions}</span>
          <span className="stat-label">Tổng câu hỏi</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{stagesWithQuiz.length}</span>
          <span className="stat-label">Stages có quiz</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{stages.length}</span>
          <span className="stat-label">Tổng stages</span>
        </div>
      </div>

      <p className="section-label">Chọn stage để làm quiz</p>

      <div className="cards-grid">
        {stagesWithQuiz.map((stage, index) => (
          <Link
            key={stage.id}
            href={`/stages/${stage.slug}#quiz`}
            className="stage-card"
          >
            <div className="card-top">
              <span className="card-stage-num">
                Stage {String(index + 1).padStart(2, "0")}
              </span>
              <span className="card-q-count">{stage.quiz.length} câu</span>
            </div>
            <p className="card-title">{stage.title}</p>
            <div className="card-footer">
              <span className="card-action">Làm quiz</span>
              <svg
                className="card-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
