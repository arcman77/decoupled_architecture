class QuestionsController < ApplicationController
  before_action :allow_cross_domain
  before_action :set_question, only: [:show, :edit, :update, :destroy, :upvote, :downvote]

  def index
    p "HIT: QuestionController index route"

    @questions = Question.all

    render :json => @questions
  end

  def create
    p "HIT: QuestionController create route"
    @question = Question.new(question_params)
    if @question.save
      render :json => @question
    else
      render :json => false
    end
  end

  def show
    @answers = @question.answers
    render :json => @question, :json => @answers
  end

  private

    def allow_cross_domain
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    end

    def question_params
      params.require(:question).permit(:title, :content)
    end

    def set_question
      @question = Question.find(params[:id])
    end
end