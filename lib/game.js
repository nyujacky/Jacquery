$l(() => {
  // $l('.my-div.cool').on('click', () => alert('clicked'));

  $l('.remove-me').remove();
  $l('html').on('keydown',moveCat);
  $l('.my-div.cool').css({'color': 'red'});

  $l.ajax({
    method: "GET",
    url:  "http://api.openweathermap.org/data/2.5/weather",
    data: { appid: "6593357a84983f34982acc13f791e08d", q: "NY,NY" },
    success(data) {
      const node = document.createElement("p");
      $l(node).append(data);
      $l('li').append(node);
    }
  })
});

function moveCat(e){
  e.preventDefault();
  switch(e.which){
    case 37:
        console.log( 'moving left' );
        // $('.ninjacat').stop().animate({
        //     left: '-=30'
        //
        // }); //left arrow key

        // $l('.ninjacat').css('left' : '-=30');
        $l('.ninjacat').css({'left':'-=30'});

        break;
    case 38:
        // $('.ninjacat').stop().animate({
        //     top: '-=30'
        // }); //up arrow key
        console.log('moving up');
        $l('.ninjacat').css({'top':'-=30'});
        break;
    case 39:
        // $('.ninjacat').stop().animate({
        //     left: '+=30'
        // }); //right arrow key
        console.log('moving right');
        $l('.ninjacat').css({'left':'+=30'});
        if (parseInt($l('.ninjacat').nodes[0].style.left) > e.view.innerWidth){
          $l('.ninjacat').nodes[0].style.left = (e.view.innerWidth - $l('.ninjacat').nodes[0].clientWidth) + 'px';
        }

        break;
    case 40:
        // $('.ninjacat').stop().animate({
        //     top: '+=30'
        // }); //bottom arrow key
        console.log('moving down');
        // $l('.ninjacat').css({'top':'+=30'});
        // if (parseInt($l('.ninjacat').nodes[0].style.top) > e.view.innerHeight) {
        //   $l('.ninjacat').nodes[0].style.top = (e.view.innerHeight - $l('.ninjacat').nodes[0].clientHeight) + 'px';
        // }
        if (parseInt($l('.ninjacat').nodes[0].style.top) + $l('.ninjacat').nodes[0].clientHeight <= e.view.innerHeight) {
          $l('.ninjacat').css({'top':'+=30'});
        }
        break;
    }
}
