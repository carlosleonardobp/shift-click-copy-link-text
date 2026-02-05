// ==UserScript==
// @name         Shift+Click Copy Link Text
// @namespace    https://github.com/carlosleonardobp/shift-click-copy-link-text
// @version      1.0.0
// @description  Shift + Left Click to copy the text from any link and show a confirmation tooltip for any browser using Tampermonkey.
// @author       https://github.com/carlosleonardobp
// @match        *://*/*
// @grant        none
// @downloadURL https://github.com/carlosleonardobp/shift-click-copy-link-text/raw/main/shift-click-copy-link-text.user.js
// @updateURL   https://github.com/carlosleonardobp/shift-click-copy-link-text/raw/main/shift-click-copy-link-text.user.js
// ==/UserScript==

;(function () {
  "use strict"

  function copiarTexto(texto) {
    const temp = document.createElement("textarea")
    document.body.appendChild(temp)
    temp.value = texto
    temp.select()
    document.execCommand("copy")
    document.body.removeChild(temp)
  }

  function mostrarTooltip(x, y) {
    const tip = document.createElement("div")
    tip.textContent = "📋 Copiado"
    tip.style.position = "fixed"
    tip.style.left = x + "px"
    tip.style.top = y + "px"
    tip.style.background = "rgba(0,0,0,0.85)"
    tip.style.color = "#fff"
    tip.style.padding = "6px 10px"
    tip.style.borderRadius = "6px"
    tip.style.fontSize = "13px"
    tip.style.zIndex = 999999
    tip.style.pointerEvents = "none"
    tip.style.transition = "opacity 0.3s ease"

    document.body.appendChild(tip)

    setTimeout(() => (tip.style.opacity = "0"), 800)
    setTimeout(() => tip.remove(), 1100)
  }

  document.addEventListener(
    "mousedown",
    function (e) {
      if (!e.shiftKey || e.button !== 0) return

      const link = e.target.closest("a")
      if (!link) return

      e.preventDefault()
      e.stopImmediatePropagation()

      const texto = link.innerText.trim()
      if (!texto) return

      copiarTexto(texto)
      mostrarTooltip(e.clientX + 10, e.clientY + 10)
    },
    true,
  )
})()
