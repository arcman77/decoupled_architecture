class QuestionsController < ApplicationController
  include HTTParty

  def index
    response = HTTParty.get("http://localhost:3003/questions/")
    questions = response["questions"]
    @questions = []
    questions.each {|question| @questions << Question.new(question)}
    @questions
  end

  def questions_index
    questions =  HTTParty.get('http://localhost:3003/questions')
    render json: {questions: questions}
  end

  def create
    url = "http://localhost:3003/questions/"
    options = {
      body: {
        question: {
          title: params[:question][:title],
          content: params[:question][:content],
        }
      }
    }
    response = HTTParty.post(url, options)
    question = Question.new(response["question"])
    render partial: 'display', locals: {question: question}
  end

  def edit

  end

  def update

  end

  def destroy
    p '*'*90
    p params[:id]
    p '*'*90
    url = "http://localhost:3003/questions/#{params[:id]}"
    response = HTTParty.delete(url)
  end

  def show
    # make HTTParty request to backend
    # get the json object
    # parse the json object & put everything into instance variables
    # render dynamically using ERB


    @question_id = params[:id]

    response = HTTParty.get("http://localhost:3003/questions/"+@question_id)

    @answer = Answer.new
    @question = Question.new(response["question"])

    answers = response["answers"]
    @answers = []
    answers.each{ |answer| @answers << Answer.new(answer) }
  end
end
