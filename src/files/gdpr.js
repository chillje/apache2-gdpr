// configuration
const gdpr_cookie = "gdpr_approved"; 
const cookie_max_age = "7776000"; // 90 days
const domain = "example.com"; 

// script
function setLang(lang) {
  lang = lang.substr(0,2).toLowerCase();
  if (!(["de", "en"]).includes(lang)) {
    lang = "de";
  }
  for (element of document.querySelectorAll("section[lang]")) {
    element.style.display = element.lang==lang?"block":"none";
  }
}

function consentAndRedirect(){
  // cookie for 90 days
  document.cookie = gdpr_cookie + "=true;max-age=" + cookie_max_age + ";path=/;domain=" + domain + ";SameSite=Lax;Secure";
  let target_url = null;
  try {
    target_url = window.location.origin + window.location.search.replace(/^\?url=/,'');
    console.log("found target url " + target_url);
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("no target url specified")
    } else {
      throw e;
    }
  }

  if (target_url && target_url.startsWith(window.location.origin + "/")) {
    console.log("autorized url, redirecting");
    window.location.replace(target_url);
  } else {
    console.log("redirecting to homepage");
    window.location.replace("/abc");
  }
};

document.addEventListener("DOMContentLoaded", ()=>{
  for (let element of document.querySelectorAll(".yes")) {
    element.addEventListener("click", consentAndRedirect);
  }
  setLang(navigator.language);
})

