document.addEventListener("DOMContentLoaded", function () {
  const h2Elements = document.querySelectorAll(".about h2");
  if (h2Elements.length === 0) return;

  h2Elements.forEach((el) => {
    const html = el.innerHTML;
    const parts = html.split(/<br\s*\/?>/i).filter((p) => p.trim().length > 0);
    if (parts.length === 0) return;

    // Find longest line and measure its rendered width
    const longestPart = parts
      .reduce((a, b) => (a.length > b.length ? a : b))
      .trim();
    const temp = document.createElement("span");
    temp.style.visibility = "hidden";
    temp.style.whiteSpace = "nowrap";
    temp.textContent = longestPart;
    el.appendChild(temp);
    const maxWidth = temp.getBoundingClientRect().width;
    temp.remove();
    el.style.width = Math.ceil(maxWidth * 1.1) + "px";

    el.innerHTML = "";
    el.classList.add("typewriter-text");

    let partIndex = 0;
    let charIndex = 0;
    const speed = 90;

    function typeChar() {
      if (partIndex >= parts.length) {
        el.classList.remove("typewriter-text");
        el.classList.add("typewriter-done");
        return;
      }

      const text = parts[partIndex].trim();
      if (charIndex < text.length) {
        if (
          el.childNodes.length === 0 ||
          el.lastChild.nodeType !== Node.TEXT_NODE
        ) {
          el.appendChild(document.createTextNode(text.charAt(charIndex)));
        } else {
          el.lastChild.textContent += text.charAt(charIndex);
        }
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        partIndex++;
        charIndex = 0;
        if (partIndex < parts.length) {
          el.appendChild(document.createElement("br"));
          setTimeout(typeChar, speed);
        } else {
          setTimeout(() => {
            el.classList.remove("typewriter-text");
            el.classList.add("typewriter-done");
          }, speed);
        }
      }
    }

    setTimeout(typeChar, 300);
  });
});
