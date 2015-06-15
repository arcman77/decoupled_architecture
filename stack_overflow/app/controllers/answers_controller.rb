class AnswersController < ApplicationController
  include HTTParty

  def create
    url = "http://localhost:3003/questions/#{params[:question_id]}/answers"
    options = {
      body: {
        answer: {
          title: params[:answer][:title],
          content: params[:answer][:content],
          question_id: params[:question_id]
        }
      }
    }
    response = HTTParty.post(url, options)
    question = Question.new(response["question"])
    answer   = Answer.new(response["answer"])
    render partial: 'display', locals: {question: question, answer: answer}
  end

  def edit
  end

  def update
      url = "http://localhost:3003/questions/#{params[:id]}"
      options = {
      body: {
        answer: {
          title: params[:answer][:title],
          content: params[:answer][:content],
          question_id: params[:question_id]
        }
      }
      response = HTTParty.put(url,options)
  end

  def destroy
    url = "http://localhost:3003/questions/#{params[:question_id]}/answers/#{params[:id]}"
    response = HTTParty.delete(url)
    # redirect_to "http://localhost:3000/questions/#{params[:question_id]}"   relic of not using ajax
  end

  private

    def allow_cross_domain
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    end

    def answer_params
      params.require(:answer).permit(:title, :content)
    end

    def set_answer
      @answer = Answer.find(params[:id])
    end

end
