(function() {
  var dplayerEle = document.getElementById('dplayer');
  var config = dplayerEle.dataset;
  var dplayer = new DPlayer(
    {
      element: dplayerEle,
      autoplay: false,
      loop: false,
      lang: 'zh',
      video: {
        url: config.video,
        pic: config.cover,
        subtitle: config.subtitle
      },
      screenshot: true,
      danmaku:
      {
        // api: "http://sike-video-test.ceoimon.com/dplayer-api/",
        api: "http://video.sike.io/dplayer-api/",
        id: config.id,
        token: "sike.io",
        maximum: 2000
      }
    }
  );

	var promo = document.createElement("div");
	promo.innerHTML = '<div class="qrcode"><img src="./images/xiaosimei_qrcode.png"><span>微信：abby_sike</span></div><p>小思妹邀你入群聊技术</p><p><span class="keywords">(ES6, React, Redux)</span></p><button class="close hairline"></button>'
	promo.classList.add("promo");
	var videoWrap = document.querySelector(".dplayer-video-wrap");
	videoWrap.appendChild(promo);
	function hideQRcode() {
    promo.classList.remove("hide");
		promo.classList.remove("show");
	}
	function showQRcode() {
    promo.classList.remove("hide");
		promo.classList.add("show");
	}
	dplayer.video.addEventListener('pause', showQRcode);
	dplayer.video.addEventListener('play', hideQRcode);
	dplayer.video.addEventListener('ended', showQRcode);
	promo.querySelector('.close').addEventListener('click', function (e) {
		e.stopPropagation();
    promo.classList.remove("show");
    promo.classList.add("hide");
	})
})();