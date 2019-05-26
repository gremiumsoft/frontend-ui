import React from "react";

type QuizQuestion = {
  id: string;
  question: string;
  answers: string[];
  correct_answer_idx: number;
};

type AllQuizzesState = {
  questions: QuizQuestion[];
  loading: boolean;
  error: boolean;
};

class AllQuizzes extends React.Component<{}, AllQuizzesState> {
  state: AllQuizzesState = {
    questions: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    fetch("/api/v1/quizzes")
      .then(response => {
        return response.json();
      })
      .then(response =>
        this.setState({
          questions: response,
          loading: false
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: true
        })
      );
  }

  render() {
    const { questions, loading, error } = this.state;

    return (
      <div>
        {loading && <div>Loading...</div>}
        {!loading &&
          !error &&
          questions.map((question, idx) => (
            <div key={question.id}>
              Question {idx}: {question.question}
              {question.answers.map(aws => (
                <p>{aws}</p>
              ))}
            </div>
          ))}
        {error && <div>Error message</div>}
      </div>
    );
  }
}

export default AllQuizzes;
