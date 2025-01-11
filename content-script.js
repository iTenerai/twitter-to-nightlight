function squeezeNightlightIn() {
    // Target the retweet button container
    const posts = document.querySelectorAll('[data-testid="Dropdown"]');
  
    posts.forEach((post) => {
      // Avoid adding the button multiple times
      if (post.querySelector('.nightlight-repost')) return;
  
      const icon = document.createElement('div');
      icon.title = 'Nightlight Repost';
      icon.className = 'nightlight-repost';
      icon.style.cursor = 'pointer';
      icon.innerHTML = `<div role="menuitem" tabindex="2" class="css-175oi2r r-1loqt21 r-18u37iz r-1mmae3n r-3pj75a r-13qz1uu r-o7ynqc r-6416eg r-1ny4l3l" data-testid="nightlightConfirm"><div class="css-175oi2r r-1777fci r-faml9v">
      
      <img src="` + browser.runtime.getURL('assets/logo_monochrome.png') + `" alt="Nightlight Repost" width="24" height="24" class="class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-1q142lx"">


      
      </div><div class="css-175oi2r r-16y2uox r-1wbh5a2"><div dir="ltr" class="css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-b88u0q" style="color: rgb(231, 233, 234);"><span class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3">Nightlight</span></div></div></div>`
  
      // Add click event listener
      icon.addEventListener('click', repostToNightlight(this));
  
      // Append the custom icon after other share methods
      post.appendChild(icon);
    });
  }
  
  // Run the function on page load
  squeezeNightlightIn();
  
  // Observe for dynamically loaded tweets
  const observer = new MutationObserver(squeezeNightlightIn);
  observer.observe(document.body, { childList: true, subtree: true });

  function repostToNightlight(element){
    console.log("Reposting to Nightlight");
    console.log(element);
  }
  