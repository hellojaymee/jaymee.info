//textWrapper
// wraps text in div with class name

// example
// textWrapper($(".testimonial-container"), ".collection-item-description", "*", "collection-item-quote");
//

function textWrapper(targetContainer, target, separator, wrapClass ) {
  $(targetContainer).each(function() {
    $(this).find(target).html(function (i, html) {
      if ( $(this).text().indexOf(separator) >= 0 ){
        splitText = $(this).text().split(separator);
        formattedText =  splitText[0] + '<span class="'+wrapClass+'">' + splitText[1] + "</span>" ;
        $(this).html(formattedText);
      }  
    }); 
  });
}