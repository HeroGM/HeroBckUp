let classElemFloat = "elem-float-top"; // ← class of floated elements

class elemFloatTop extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
    this.floatPageEls = [];
    this.token;
  }

  layoutNode(node) {
    // If you find a float page element, move it in the array,
    if (node.nodeType == 1 && node.classList.contains(classElemFloat)) {
      let clone = node.cloneNode(true);
      this.floatPageEls.push(clone);
      // Remove the element from the flow by hiding it.
      node.style.display = "none";
    }
  }

  beforePageLayout(page, content, breakToken) {
    // If there is an element in the floatPageEls array,
    if (this.floatPageEls.length >= 1) {
      // Put the first element on the page.
      page.element
        .querySelector(".pagedjs_page_content")
        .insertAdjacentElement("afterbegin", this.floatPageEls[0]);
      this.floatPageEls.shift();
    }
  }
}
Paged.registerHandlers(elemFloatTop);

//However, we can’t use it today. I personally encounter this problem in some book design I make. So, based on a script made by Julien I share with you a little script to make floating-like elements in paged.js to avoid large chunks of whitespace at the end of pages. For this, we add a custom module to Paged.js using handlers and hooks.

//As you can see, the script is not very long. You just have to add it in your HTML document (after the paged.js script), add the class elem-float-top to the elements where you want it to apply, and watch the magic happen.