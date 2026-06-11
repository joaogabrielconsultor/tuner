// JavaScript Document

$(document).ready(function() {
  $('.faq h4').each(function() {
    var tis = $(this), state = false, answer = tis.next('div').slideUp();
    tis.click(function() {
      state = !state;
      answer.slideToggle(state);
      tis.toggleClass('active',state);
    });
  });
});
