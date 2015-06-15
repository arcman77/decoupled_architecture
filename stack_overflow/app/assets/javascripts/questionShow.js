$(document).on("page:change",function(){
  answerDelete();
  answerCreate();
})



// $('#question-edit-delete').on('submit', '#edit-question', function(event){
//     event.preventDefault();
//     console.log($(this))
//   })



var answerDelete = function(){
  $(".answers-index").on("click", ".delete", function(event){
    $this = $(this);
    event.preventDefault();
    url = 'http://localhost:3000' + $this.find('form').attr('action');
    $.ajax({
      url: url,
      type: "delete"
    }).done(function(data){
      console.log("Answer delete successful.")
      $this.parents(".answer-display").remove();
    }).fail(function(data){
      console.log("Answer delete failed.")
    })
  })
};

var answerCreate = function(){
  $('#new-answer-form').on('submit', function(event){
    event.preventDefault();
    $form = $(this);
    $.ajax({
      url: 'http://localhost:3000' + $form.attr('action'),
      type: 'post',
      data: $(this).serialize()
    }).done(function(data) {
      $form.each(function(){this.reset();});
      $(".answers-index").append(data);
      console.log('Answer creation successful.');
    }).fail(function() {
      console.log('Answer creation failed.');
    });
  });
};


var appendAnswer = function(answer){
  $("#questions_container").append(questionLink(question))
  $("#questions_container").append("<content>" + question.content + "</content>")
};




// if ($(".questions-show").length) {
//     var urlString = 'http://localhost:3000/questions/';
//     //debugger
//     $.ajax({
//         url: urlString,
//         type: 'get'
//     }).done(function(data) {
//         data.forEach(function(question){
//           appendQuestion(question);
//           //appendQuestion('<%= escape_javascript JSON.parse(question) %>')
//         })
//     }).fail(function() {
//         console.log('may your jimmies remain unrustled');
//     });
//   }
//
/*
<div><%= link_to "Up", question, method: :GET, vote: {value: 1, votable_id: question.id, votable_type: question} %></div>

$.ajax({
  url: 'http://localhost:3000/questions',
  type: 'post',
  data: $(this).serialize()
}).done(function(data) {
  $form.each(function(){this.reset();});
  appendQuestion(data);
}).fail(function() {
  console.log('you fucked up.');
});

*/
