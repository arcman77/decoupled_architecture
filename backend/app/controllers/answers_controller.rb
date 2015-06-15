class AnswersController < ApplicationController
  def create
    new_answer = Answer.create(answer_params)
    new_question = Question.find(new_answer.question_id)
    render :json =>{"question" => new_question, "answer" => new_answer }
  end

  def destroy
    if Answer.destroy(params[:id])
      return true
    else
      return false
    end
  end


  private

    def allow_cross_domain
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    end

    def answer_params
      p params
      params.require(:answer).permit(:title, :content, :question_id)
    end

    def set_answer
      @answer = Answer.find(params[:id])
    end
end
