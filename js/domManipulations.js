
/*
  Code relating to non data-dependent DOM-manipulation.
*/

export function gateRemoval() {
  document.getElementById("body").removeChild(document.getElementById("gate"));

  document.getElementById("state_container").style.opacity = "1";
  document.getElementById("header").style.opacity = "1";
  document.getElementById("currentDataType").style.opacity = "1";
  document.getElementById("currentTimePeriod").style.opacity = "1"
  document.getElementById("parameterMenu").style.opacity = "1";


  document.getElementById("serverContent").style.opacity = "0";

  document.getElementById("firstTriangleIndicator").style.transform = "rotate(0deg)";
  document.getElementById("userSlideoutMenu").style.width = "0px"

  setTimeout( () => {
    document.getElementById("serverContent").style.opacity = "1";
    document.getElementById("linkContainer").style.opacity = "1";
  }, 150);
}

export function gitLinkAdjustment() {
  const linkContainer = document.createElement("div");
  linkContainer.id = "linkContainer";

  const githubLink = document.createElement("a");
  githubLink.href = "http://github.com/gustavfahraeus"
  githubLink.target = "_blank"
  githubLink.appendChild(linkContainer);

  const githubName = document.createElement('p');
  githubName.id = "githubName";
  githubName.innerHTML = "gustavfahraeus"
  linkContainer.appendChild(githubName)

  const image = document.createElement("img");
  image.className = "githubLogo";
  image.setAttribute("src", "images/github_mark.png");
  linkContainer.appendChild(image)

  document.getElementById("body").appendChild(githubLink);
}

export function fade(fadeTarget) {
  fadeTarget.style.opacity = 1;
  let fadeEffect1 = setInterval( () => {
    if (fadeTarget.style.opacity > 0) fadeTarget.style.opacity -= 0.1;

    if (fadeTarget.style.opacity <= 0) {
          clearInterval(fadeEffect1);
          setTimeout( () => fadeIn(fadeTarget, 0), 385)
    }}, 3);
}

export function fadeIn(fadeTarget) {
  fadeTarget.style.opacity = 0;
  setTimeout( () => {
    let fadeEffect2 = setInterval( function() {
    var opac = parseFloat(fadeTarget.style.opacity);
    if (opac < 1) {
      opac += 0.5;
      fadeTarget.style.opacity = opac;
    } 
    else if (fadeTarget.style.opacity >= 1) clearInterval(fadeEffect2)
  },1)},95);
}

document.addEventListener('click', function(event) {
  let parameterMenu = document.getElementById("parameterMenu");
  let parameterDropdown = document.getElementById("parameterDropdown");
  let firstTriangleIndicator = document.getElementById("firstTriangleIndicator");

  // Parameter Dropdown
  if (parameterMenu.contains(event.target) && firstTriangleIndicator.style.transform === "rotate(0deg)") {
    document.getElementById("firstTriangleIndicator").style.transform = "rotate(-90deg)"
    
    parameterDropdown.style.height = "180px";
    parameterDropdown.style.borderTop = "1px solid #8db596";
    } 
    else {
      document.getElementById("firstTriangleIndicator").style.transform = "rotate(0deg)"
      parameterDropdown.style.height = "0px";
      parameterDropdown.style.borderTop = "none";
  }

  let userSlideoutMenu = document.getElementById("userSlideoutMenu");
    let logOutItem = document.getElementById("logOutItem");
  if (event.target.id === "userProfileMenuToggle" && userSlideoutMenu.style.width == "0px" ) {

    userSlideoutMenu.style.width = "75px";
    logOutItem.style.opacity = "1"
  } else {
 
    userSlideoutMenu.style.width = "0px";
    logOutItem.style.opacity = "0"
  }
});



