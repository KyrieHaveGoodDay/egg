// $('.discount').fadeOut(200);
$(function () {
  // [側邊選單]
  var $sidenav = $('.sidenav');
  // [側邊選單]--// 收合
  $sidenav.on('click', '.sidenav__btn a', function (e) {
    e.preventDefault();
    $(this).parents('.sidenav').toggleClass('sidenav--hide');
  });

  // [右邊選單]
  var $rightNav = $('.sidenav--right');
  // [右邊選單]--// 側選單是否存在
  var $sidenavTop = $rightNav.length > 0 ? $rightNav.offset().top : 0;
  // [右邊選單]--// 手機版置頂
  function rightnavFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
      // $('.wrap').addClass('addPadding');
    } else {
      $sidenav.removeClass('fixed');
      // $('.wrap').removeClass('addPadding');
    }
  }

  // [右邊GoTop]--// 滾動出現
  function goTopShow() {
    var $windowTop = $(window).scrollTop();
    $windowTop >= 100 ? $('.gotop').addClass('show') : $('.gotop').removeClass('show');
  }
  // [右邊GoTop]--// gotop
  $('.gotop').on('click', function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // [錨點]--// 判斷滑動位置
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var headerH = $('.header').height();
    var sidenavH = $('.sidenav').height();
    var targetTop = $($(this).attr('href')).offset().top;
    var scrollPos = $(window).width() >= 768 ? targetTop : targetTop - headerH - sidenavH;
    $('html, body').stop().animate(
      {
        scrollTop: scrollPos,
      },
      300
    );
  });

  $(window)
    .on('scroll', function () {
      goTopShow();
      $(window).width() < 768 && rightnavFixedTop();
    })
    .scroll();
});

// 敲擊次數
var index = 0;
// 被扣的血量
var blood = 0;
// 總共的血量
var too = 100;

// main! 
// 先做算式運算、在做次數判斷、在做動畫
$('.egg').on('touchstart', function (e) {
  // console.log(e);


  // 運算
  bloodAni();
  // 達到指定次數做...
  over();
  // 啟動敲擊功能動畫
  ani();
  // 
  light();

})

// 動畫事件
function ani() {
  $('.egg').css('pointer-events', 'none')


  // 關掉敲下去的功能
  $('.egg').css('pointer-events', 'none')
  const t1 = gsap.timeline();
  t1.to('.tool', { duration: 0.05, x: -20, y: 20, rotate: -20, repeat: 1, yoyo: true })
  t1.from('.egg_egg', { duration: 0.3, x: 'random([-20，0，5，10])', y: 'random([-20，0，20，40])', rotate: 'random([-20，0，20，40])', scale: 0.7, opacity: 1 })
  t1.to('.egg', { duration: 0.05, x: -10, rotate: -10, repeat: 1, yoyo: true }, 0.1)
  t1.to('.tool , .egg_egg', { clearProps: "all" })

  // 跑完動畫再打開敲下去功能
  setTimeout(() => {
    $('.egg').css('pointer-events', 'auto')
  }, 300)
}

// 槌一次扣一次血量
function bloodAni() {
  // 槌一次+1
  index++
  //一次+5 
  blood = blood + 5
  // 當血量100要做的事情...
  if (blood == 100) {
    blood = 100;
    // 蛋殼掉落
    gsap.to('.egg , .egg_egg , .ghost', { duration: 0.2, display: 'none' })
    gsap.to('.chip', { duration: 0.5, opacity: 1, x: 0, y: 0, rotate: 0 })

    // 捶子動畫跑完消失
    setTimeout(() => {
      $('.tool').fadeOut();
    }, 1500)

  }
  // 扣掉 100-blood 等於血量總數
  too = 100 - blood
  $('.schedule_fff').css('width', '' + too + '%')



}

// 切換蛋的狀態
function over() {

  if (index == 7) {

    $('.egg').css('background-position-x', '50%')
  }
  if (index == 14) {
    $('.egg').css('background-position-x', '100%')

  }
  if (index == 20) {
    console.log('20');
    $('.schedule_left').css('overflow', 'hidden')
    setTimeout(() => {
      $('.discount').css('display', 'flex');
    }, 2000)


  }
}

// gsap.from('.light',{duration:2 , left:'60%',bottom:'536%'  , ease:'power4.out'})
function light() {
  
  var str = $('<img class="light" src="img/light.png" alt="">');
  var lightobj = ['bounce.out', 'power1.out', 'power2.out', 'power3.out', 'power4.out']
  var lightNum = Math.floor(Math.random() * 5);

  
  $('#schedule').append(str);
  // $('.light').isTweening = false;


  gsap.set('.light',{left:'200px',bottom:'536%'})
  // 計算 x y軸
  var lightWidth =  $('.light').width();
  var lightWidthMax = Math.floor(Math.random() * lightWidth);
  console.log(lightWidth);
  const t1 = gsap.timeline();
  t1.to('.light', {
    duration: 5,
    left: 100,
    bottom: 0,
    ease: '' + lightobj[lightNum] + ''
  })
  // .to('.light', {
  //   duration: 2,
  //   left: 0,
  //   bottom: 0,
  //   ease: '' + lightobj[lightNum] + ''
  // })
  .to('.light', {
     duration: 5, 
     opacity: 0,
      onComplete: function () {
        str.remove();
        
      },
      // delay:1
    },0.7)

}

// function start(){
//   console.log('start');
//   $('.light').isTweening = true;
// }
// function update(){
//   console.log('animating');
// }
// function complete(){
//   console.log('end');
//   $('.light').isTweening = true;
// }