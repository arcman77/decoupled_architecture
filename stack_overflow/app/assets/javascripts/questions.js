$(document).on("page:change",function(){
  questionsIndex();
  questionDelete();
  questionEdit();
})

var questionsIndex = function(){
  if ($(".questions-index").length) {

    $('#ask').on('click', function(event){
       $('#form_question').css("display", "inline-block");
    });

    $('#form_question').on('submit', function(event){
      event.preventDefault();
      $form = $(this);
      $.ajax({
        url: 'http://localhost:3000/questions',
        type: 'post',
        data: $(this).serialize()
      }).done(function(data) {
        $form.each(function(){this.reset();});
        console.log(data);
        $('#questions_container').append(data);
      }).fail(function() {
        console.log('you fucked up.');
      });
    });
  };
}

var questionDelete = function(){
  $('.question-edit-delete').on('submit', '.delete-question', function(event){
    event.preventDefault();
    $this = $(this);
    url = 'http://localhost:3000' + $(this).attr('action');
    console.log(url);
    $.ajax({
      url: url,
      type: "delete"
    }).done(function(data){
      $this.parents(".question-display").remove();
      console.log("Question delete successful.");
    }).fail(function(data){
      console.log("Answer delete failed.")
    })
  })
}

var questionEdit = function(){
  $('.question-edit-delete').on('submit', '.edit-question', function(event){
    event.preventDefault();
    $this = $(this);
    url = 'http://localhost:3000' + $(this).attr('action');
    console.log(url);
    $.ajax({
      url: url,
      type: "delete"
    }).done(function(data){
      $this.parents(".question-display").remove();
      console.log("Question delete successful.");
    }).fail(function(data){
      console.log("Answer delete failed.")
    })
  })
}

var appendQuestion = function(question){
  $("#questions_container").append(questionLink(question))
  $("#questions_container").append("<content>" + question.content + "</content>")
};


// }

var questionLink = function(question){
  return "<h3><a href='http://localhost:3000/questions/" + question.id + "'>" + question.title + "</a></h3>"
}



    // $.ajax({
    //     url: 'http://localhost:3000/questions_index',
    //     type: 'get'
    // }).done(function(data) {
    //   data.questions.forEach(function(question){
    //     appendQuestion(question);
    //   })
    // }).fail(function() {
    //     console.log('Questions index load failed.');
    // });


    // var questionShow = function(){
//   if ($(".questions-show").length) {
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

